import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { BookingEntity } from "./booking.schema";
import { BookingActivityType } from "../enums/booking-activity-type.enum";
import { UserEntity } from "../../users";
import { BaseTimestamp } from "../../interfaces";

export type BookingActivityDocument = HydratedDocument<BookingActivity & BaseTimestamp>;

@Schema({collection:"booking-activities", timestamps: true, versionKey: false})
export class BookingActivity {
    @Prop({required:true, type: Types.ObjectId, ref: BookingEntity.name})
    bookingId: Types.ObjectId;

    @Prop({required:true, enum: BookingActivityType})
    type: BookingActivityType;

    /*
    * actorId is the id of the user who performed the action
    */
    @Prop({type: Types.ObjectId, ref: UserEntity.name})
    actorId?: Types.ObjectId;

    @Prop()
    message?: string;

    @Prop({type:Object})
    meta?: Record<string, any>;
}

export const BookingActivitySchema = SchemaFactory.createForClass(BookingActivity);

BookingActivitySchema.index({bookingId:1, createdAt:1})
BookingActivitySchema.index({type:1})