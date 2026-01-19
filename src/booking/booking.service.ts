import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, QueryFilter, Types } from "mongoose";

import { BookingEntity, BookingDocument, BookingSchedule, AssignWorkerEntity, AssignWorkerDocument } from "./schemas";
import { ServiceEntity, ServiceDocument } from "../services";
import {
  BookingStatus,
  PricingMode,
  BookingType,
  BookingScheduleType,
  WorkerJobStatus
} from "./enums";
import { CommissionType } from "../enums";
import { CreateBookingInput, FIndWorkerInput } from "./dto";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { BookingEvents } from "./enums/booking-events.enum";
import { UserEntity, UserEntityDocument } from "../users";
import { WorkerDocument, WorkerEntity, WorkerStatus } from "../worker";
import Redis from "ioredis";

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(BookingEntity.name)
    private readonly bookingModel: Model<BookingDocument>,
    @InjectModel(AssignWorkerEntity.name)
    private readonly assignWorkerModel: Model<AssignWorkerDocument>,

    @InjectModel(ServiceEntity.name)
    private readonly serviceModel: Model<ServiceDocument>,

    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserEntityDocument>,
    @InjectModel(WorkerEntity.name)
    private readonly workerModel: Model<WorkerDocument>,

    private readonly eventEmitter: EventEmitter2,

    @Inject('REDIS_PUBSUB')
    private readonly redis: Redis
  ) {}

  async createBooking(
    userId: Types.ObjectId,
    input: CreateBookingInput
  ) {

    const existingBooking = await this.findExistingBooking(userId);
    if(existingBooking){
      throw new BadRequestException("User already has an existing booking");
    }

    const service = await this.serviceModel.findById(input.serviceId);
    if (!service) {
      throw new NotFoundException("Service not found");
    }

    if (input.numberOfWorkers <= 0) {
      throw new BadRequestException("Invalid number of workers");
    }

    const tier = service.pricingTiers.find(
      t => t.tierId.toString() === input.serviceTierId
    );
    if (!tier) {
      throw new BadRequestException("Service tier not found");
    }

    let startUTC :Date;

    if(input.bookingType === BookingType.SCHEDULED){
      if(!input.startDateTime){
        throw new BadRequestException("Start time required for scheduled booking");
      }
      startUTC = new Date(input.startDateTime);
    } else {
      startUTC = new Date();
    }

    let schedule:BookingSchedule = {
      startDateTime: startUTC
    };

    let amount = 0;

    if(input.pricingMode === PricingMode.HOURLY){
      if(!tier.HOURLY){
        throw new BadRequestException("Hourly pricing not available");
      }

      if(!input.estimatedHours || input.estimatedHours <= 0){
        throw new BadRequestException("Estimated hours are required");
      }

      schedule.estimatedHours = input.estimatedHours;

      amount = 
              tier.HOURLY.ratePerHour *
              input.estimatedHours *
              input.numberOfWorkers;
    }

    if(input.pricingMode === PricingMode.PER_DAY){
      if(!tier.PER_DAY){
        throw new BadRequestException("Daily pricing not available");
      }

      if(!input.estimatedDays || input.estimatedDays <= 0){
        throw new BadRequestException("Estimated days are required");
      }

      schedule.estimatedDays = input.estimatedDays;

      amount = 
              tier.PER_DAY.ratePerDay *
              input.estimatedDays *
              input.numberOfWorkers;
    }

    const {commissionType, commissionValue} = tier;
    let commissionAmount = 0;

    if(commissionType === CommissionType.PERCENTAGE){
      commissionAmount = (amount * commissionValue)/100;
    } else {
      commissionAmount = commissionValue;
    }

    const workerPoolAmount = amount - commissionAmount;

    if(workerPoolAmount < 0){
      throw new BadRequestException("Invalid Configuration");
    }

    const booking = await this.bookingModel.create({
      userId,
      serviceId: service._id,
      serviceTierId: tier.tierId,

      bookingType:input.bookingType,
      pricingMode: input.pricingMode,

      schedule,
      numberOfWorkers: input.numberOfWorkers,

      currency: service.currency,

      amount,
      commissionType,
      commissionValue,
      commissionAmount,
      workerPoolAmount,

      workDescription: input.workDescription,
      status: BookingStatus.REQUESTED,

      location: input.location
    })

    booking.populate([
      {
        path:"userId",
        model:UserEntity.name
      },
      {
        path:"serviceId",
        model:ServiceEntity.name
      }
    ])

    this.eventEmitter.emit(BookingEvents.CREATED,{
      eventName: BookingEvents.CREATED,
      bookingId: booking._id,
      actorId: userId
    })

    const getWorkers = await this.findWorkers({
      lat: booking.location.coordinates[1],
      lng: booking.location.coordinates[0],
      serviceTierId: booking.serviceTierId,
      categoryId: service.category._id,
      status: WorkerStatus.ONLINE
    })

    await this.redis.publish(BookingEvents.CREATED,JSON.stringify({
      booking:booking,
      workerIds: getWorkers.map(w => w.userId)
    }))

    this.sendBookingRequestNotification(booking._id);

    return booking;

  }

  /**
   * Find Existing Booking which is not completed or cancelled or rejected
   * @param userId 
   * @returns BookingDocument
   */
  async findExistingBooking(userId: Types.ObjectId){
    const booking = await this.bookingModel.findOne({
      userId,
      status: {
        $in: [BookingStatus.REQUESTED, BookingStatus.WORKER_ACCEPTED, BookingStatus.WORKER_CANCELLED]
      }
    })
    return booking;
  }

  async sendBookingRequestNotification(bookingId: Types.ObjectId){
    const booking = await this.bookingModel.findById(bookingId);
    if(!booking){
      throw new NotFoundException("Booking not found");
    }

    const service = await this.serviceModel.findById(booking.serviceId);
    if(!service){
      throw new NotFoundException("Service not found");
    }
  }


  async findWorkers(input: FIndWorkerInput){
    const {
      lat,
      lng,
      serviceTierId,
      categoryId,
      status
    } = input;

    const query: QueryFilter<WorkerDocument> = {
      location:{
        $near:{
          $geometry:{
            type:"Point",
            coordinates:[lng,lat]
          },
          $maxDistance: 50 * 1000  // km -> meters = 50km
        }
      }
    };

    if(serviceTierId){
      query.serviceTierIds = serviceTierId;
    }

    if(categoryId){
      query.categoryIds = categoryId;
    }

    if(status){
      query.status = status;
    }

    return this.workerModel.find(query);
  }


  async checkWorkerAvailability(lat:number, lng:number){
    const workers = await this.findWorkers({
      lat,
      lng
    })

    if(workers.length === 0){
      throw new BadRequestException("The requested service is not available in your region");
    }
  }

  async setWorkerToBooking(bookingId: Types.ObjectId, workerIds: Types.ObjectId[]){
    const booking = await this.bookingModel.findById(bookingId);
    if(!booking){
      throw new NotFoundException("Booking not found");
    }

    const numberOfWorkers = booking.numberOfWorkers;
    const numberOfCurrentlyAssignedWorkers = await this.assignWorkerModel.countDocuments({
      bookingId,
      status: WorkerJobStatus.ASSIGNED
    })

    const numberOfWorkersToAssign = numberOfWorkers - numberOfCurrentlyAssignedWorkers;

    if(numberOfWorkersToAssign <= 0){
      throw new BadRequestException("All workers are already assigned");
    }

    if(workerIds.length > numberOfWorkersToAssign){
      throw new BadRequestException("Too many workers");
    }

    const assignWorkers = await this.assignWorkerModel.insertMany(workerIds.map(workerId => ({
      bookingId,
      workerId,
      status: WorkerJobStatus.ASSIGNED,
      assignedAt: new Date()
    })))

    return assignWorkers;
  }


  async cancelBooking(
    bookingId: Types.ObjectId,
    userId: Types.ObjectId
  ){
    const booking = await this.bookingModel.findById(bookingId);
    if(!booking){
      throw new NotFoundException("Booking not found");
    }

    const validStatus = [
      BookingStatus.REQUESTED,
      BookingStatus.WORKER_ACCEPTED,
      BookingStatus.WORKER_CANCELLED
    ]


    if(!validStatus.includes(booking.status)){
      throw new BadRequestException("Booking cannot be cancelled");
    }

    await this.bookingModel.updateOne({
      _id: bookingId
    },{
      status: BookingStatus.CUSTOMER_CANCELLED
    })

    await this.assignWorkerModel.updateMany({
      bookingId
    },{
      status: WorkerJobStatus.CANCELLED
    })

    return booking;
  }
}
