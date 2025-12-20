import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { UserEntity } from "../../users";
import { BookingEntity } from "./booking.schema";
import { BaseTimestamp } from "../../interfaces";
import { HydratedDocument } from "mongoose";
import { WorkerJobStatus } from "../enums/worker-job-status.enum";

export type AssignWorkerDocument = HydratedDocument<AssignWorkerEntity & BaseTimestamp>

@Schema({collection:"booking_assigned_workers",versionKey:false})
export class AssignWorkerEntity {
    @Prop({required:true, type:Types.ObjectId, ref:UserEntity.name})
    workerId: Types.ObjectId;

    @Prop({required:true, type: Types.ObjectId, ref: BookingEntity.name})
    bookingId: Types.ObjectId;

    @Prop({required:true, enum: WorkerJobStatus, default:WorkerJobStatus.ASSIGNED})
    status: WorkerJobStatus;

    @Prop()
    startedAt?: Date;

    @Prop()
    completedAt?: Date;

    @Prop({type: Types.ObjectId, ref: UserEntity.name})
    assignedBy?: Types.ObjectId; 
    
    @Prop({required:true})
    assignedAt: Date;
}

export const AssignWorkerSchema = SchemaFactory.createForClass(AssignWorkerEntity);
