import { Injectable } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { BookingActivity, BookingActivityDocument } from "./schemas/booking-activity.schema";
import { BookingActivityType } from "./enums/booking-activity-type.enum";

@Injectable()
export class BookingActivityService {
    constructor(
        @InjectModel(BookingActivity.name)
        private readonly bookingActivityModel: Model<BookingActivityDocument>
    ){
    }

    async logActivity(
        bookingId: Types.ObjectId,
        actorId: Types.ObjectId,
        type: BookingActivityType
    ){
        await this.bookingActivityModel.create({
            bookingId,
            actorId,
            type
        });
    }
}