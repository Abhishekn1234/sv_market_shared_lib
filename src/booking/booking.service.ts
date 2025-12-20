import {
  BadRequestException,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

import { BookingEntity, BookingDocument, BookingSchedule } from "./schemas";
import { ServiceEntity, ServiceDocument } from "../services";
import {
  BookingStatus,
  PricingMode,
  BookingType,
  BookingScheduleType
} from "./enums";
import { CommissionType } from "../enums";
import { CreateBookingInput } from "./dto";

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(BookingEntity.name)
    private readonly bookingModel: Model<BookingDocument>,

    @InjectModel(ServiceEntity.name)
    private readonly serviceModel: Model<ServiceDocument>
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
      status: BookingStatus.REQUESTED
    })

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
        $nin: [BookingStatus.COMPLETED, BookingStatus.CANCELLED,BookingStatus.REJECTED]
      }
    })
    return booking;
  }
}
