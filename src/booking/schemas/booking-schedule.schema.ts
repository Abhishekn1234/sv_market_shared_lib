import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BookingScheduleType } from "../enums/booking-schedule-type.enum";
import { HydratedDocument } from "mongoose";
import { BaseTimestamp } from "../../interfaces";

export type BookingScheduleDocument = HydratedDocument<BookingSchedule & BaseTimestamp>

@Schema({ _id: false, versionKey: false })
export class BookingSchedule {

    @Prop({ required: true })
    startDateTime: Date;

    @Prop()
    estimatedHours?: number;

    @Prop()
    estimatedDays?: number;

    @Prop()
    actualHours?: number;

    @Prop()
    actualDays?: number;
}

export const BookingScheduleSchema =
  SchemaFactory.createForClass(BookingSchedule);