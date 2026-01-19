import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { UserEntity } from "../../users";
import { ServiceEntity, ServiceTier } from "../../services";
import { BaseTimestamp } from "../../interfaces";
import { BookingStatus, PricingMode } from "../enums";
import { BookingSchedule } from "./booking-schedule.schema";
import { BookingType } from "../enums/booking-type.enum";

export type BookingDocument = HydratedDocument<BookingEntity & BaseTimestamp>

@Schema({collection:"bookings",timestamps: true,versionKey:false})
export class BookingEntity {
    @Prop({required:true,ref: UserEntity.name,type: Types.ObjectId})
    userId: Types.ObjectId;

    @Prop({required:true,ref: ServiceEntity.name,type: Types.ObjectId})
    serviceId: Types.ObjectId;

    @Prop({required:true})
    bookingType: BookingType;

    @Prop({required:false,type: BookingSchedule})
    schedule?: BookingSchedule;

    @Prop({required:true,enum: BookingStatus, default:BookingStatus.REQUESTED})
    status: BookingStatus;

    @Prop({required:true, ref: ServiceTier.name, type: Types.ObjectId})
    serviceTierId: Types.ObjectId;

    @Prop({required:true,enum: PricingMode, default:PricingMode.HOURLY})
    pricingMode: PricingMode;

    @Prop({required:true})
    currency: string;

    @Prop({required:true})
    amount: number;

    @Prop({required:true})
    commissionValue: number;

    @Prop({required:true})
    commissionType: string;

    @Prop({required:true})
    commissionAmount: number;

    @Prop({required:true})
    numberOfWorkers:number;

    @Prop({required:false})
    actualWorkersCount?:number;

    @Prop({required:true})
    workerPoolAmount:number;

    @Prop({required:false})
    finalWorkerPoolAmount?:number;
    
    @Prop({required:false})
    finalAmount?:number;

    @Prop()
    startedAt?: Date;

    @Prop()
    completedAt?: Date;

    @Prop()
    workDescription?: string;

    @Prop({default:false})
    isFinalized?: boolean;

    @Prop({
        type: {
            type: String,
            enum: ["Point"],
            default: "Point"
        },
        coordinates: {
            type: [Number], // [lng, lat]
            required: true
        }
    })
    location: {
        type: "Point";
        coordinates: [number, number];
    };
}

export const BookingSchema = SchemaFactory.createForClass(BookingEntity);

BookingSchema.index({location:"2dsphere"});