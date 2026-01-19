import { Module } from "@nestjs/common";
import { BookingService } from "./booking.service";
import { BookingEntity, BookingSchema } from "./schemas/booking.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { AssignWorkerEntity, AssignWorkerSchema, BookingActivity, BookingActivitySchema, BookingOTP, BookingOTPSchema, BookingSchedule, BookingScheduleSchema } from "./schemas";
import { ServiceEntity, ServiceSchema } from "../services";
import { BookingActivityService } from "./booking-activity.service";
import { BookingActivityListener } from "./listeners/booking-activity.listener";
import { UserEntity, UserSchema } from "../users";
import { WorkerEntity, WorkerSchema } from "../worker";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: BookingEntity.name, schema: BookingSchema },
            { name: AssignWorkerEntity.name, schema: AssignWorkerSchema },
            { name: BookingOTP.name, schema: BookingOTPSchema },
            { name: BookingSchedule.name, schema: BookingScheduleSchema },
            { name: ServiceEntity.name, schema: ServiceSchema},
            { name: BookingActivity.name, schema: BookingActivitySchema},
            { name: UserEntity.name, schema: UserSchema},
            { name: WorkerEntity.name, schema: WorkerSchema}
        ])
    ],
    providers: [BookingService,BookingActivityService,BookingActivityListener],
    exports: [BookingService]
})
export class BookingModule {}