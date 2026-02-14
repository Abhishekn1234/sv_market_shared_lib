import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { BaseTimestamp } from "../../interfaces";


export type ServiceTierDocument = HydratedDocument<ServiceTier & BaseTimestamp>

@Schema({timestamps: true, versionKey: false})
export class ServiceTier {
    @Prop({required:true, unique:true})
    code: string;

    @Prop({required: true})
    displayName: string;

    @Prop()
    description?: string;
    @Prop()
    features?:string[];

    @Prop({default: true})
    isActive: boolean;
}

export const ServiceTierSchema = SchemaFactory.createForClass(ServiceTier);
