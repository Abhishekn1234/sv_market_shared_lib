import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserEntity } from "../../users";
import { HydratedDocument, Types } from "mongoose";
import { ServiceTier } from "../../services";
import { CategoriesEntity } from "../../categories";
import { WorkerStatus } from "../enums/worker-status.enum";

export type WorkerDocument = HydratedDocument<WorkerEntity>

@Schema({collection:"worker",versionKey:false})
export class WorkerEntity {
    @Prop({required:true, ref:UserEntity.name, type:Types.ObjectId})
    userId: Types.ObjectId;

    @Prop({required:true, ref:ServiceTier.name, type:[Types.ObjectId]})
    serviceTierIds: Types.ObjectId[];

    @Prop({required:true, ref:CategoriesEntity.name, type: [Types.ObjectId]})
    categoryIds: Types.ObjectId[];

    @Prop({required:true, enum: WorkerStatus, default:WorkerStatus.WAITING_DOCUMENTS})
    status: WorkerStatus;

    @Prop({
        type:{
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates:{
            type: [Number], // [lng, lat]
            required: true
        }
    })
    location:{
        type: 'Point',
        coordinates: [number,number]
    };

    // Service radius (in KM)
    @Prop({required: false, default:1})
    serviceRadius?: number;
}

export const WorkerSchema = SchemaFactory.createForClass(WorkerEntity);

WorkerSchema.index({location:"2dsphere"});