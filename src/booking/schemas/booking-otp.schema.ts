import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { BookingEntity } from "./booking.schema";
import { OTPPurpose } from "../enums/otp-purpose.enum";
import { UserEntity } from "../../users";
import { BaseTimestamp } from "../../interfaces";

export type BookingOTPDocument = HydratedDocument<BookingOTP & BaseTimestamp>

@Schema({timestamps:true, versionKey:false})
export class BookingOTP {
    @Prop({required:true, type: Types.ObjectId, ref: BookingEntity.name})
    bookingId: Types.ObjectId;

    @Prop({required:true, enum: OTPPurpose})
    purpose: OTPPurpose;

    @Prop({required:true})
    otpHash: string;

    @Prop({required:true})
    expiresAt: Date;

    @Prop({default:false})
    isUsed: boolean;

    @Prop({type: [Types.ObjectId], ref: UserEntity.name})
    appliedWorkers: Types.ObjectId[];

    @Prop({default:0})
    attempts: number;
}

export const BookingOTPSchema = SchemaFactory.createForClass(BookingOTP);

BookingOTPSchema.index(
    {expiresAt:1},
    {expireAfterSeconds: 0}
);

BookingOTPSchema.index(
    {bookingId:1, purpose:1, isUsed:1},
    {unique:true, partialFilterExpression:{isUsed:false}}
);
