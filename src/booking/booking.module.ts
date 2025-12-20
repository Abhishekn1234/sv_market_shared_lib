import { Module } from "@nestjs/common";
import { BookingService } from "./booking.service";
import { BookingEntity, BookingSchema } from "./schemas/booking.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { AssignWorkerEntity, AssignWorkerSchema, BookingOTP, BookingOTPSchema, BookingSchedule, BookingScheduleSchema } from "./schemas";
import { ServiceEntity, ServiceSchema } from "../services";

@Module({
    providers: [BookingService],
    imports: [
        MongooseModule.forFeature([
            { name: BookingEntity.name, schema: BookingSchema },
            { name: AssignWorkerEntity.name, schema: AssignWorkerSchema },
            { name: BookingOTP.name, schema: BookingOTPSchema },
            { name: BookingSchedule.name, schema: BookingScheduleSchema },
            { name: ServiceEntity.name, schema: ServiceSchema}
        ])
    ],
    exports: [BookingService]
})
export class BookingModule {}