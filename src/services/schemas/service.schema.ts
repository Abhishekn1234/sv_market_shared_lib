import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { CommissionType } from "../../enums";
import { BaseTimestamp } from "../../interfaces";
import { ServiceTier } from "./service-tier.schema";
import { CategoriesEntity } from "../../categories/schemas/categories.schema";
import { PricingTierDTO } from "../dto";

export type ServiceDocument = HydratedDocument<ServiceEntity & BaseTimestamp>;

@Schema({ collection: "services", timestamps: true, versionKey: false })
export class ServiceEntity {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    slug: string;

    @Prop({ type:Types.ObjectId, ref:CategoriesEntity.name, required: true })
    category: Types.ObjectId;

    @Prop()
    iconUrl?: string;

    @Prop()
    iconPublicId?: string;

    @Prop()
    thumbnailUrl?: string;

    @Prop()
    thumbnailPublicId?: string;

    @Prop()
    description?: string;

    @Prop({default:"SAR"})
    currency: string;

    @Prop({
        type: [
            {
                tierId: {type: Types.ObjectId, ref: ServiceTier.name, required: true},
                HOURLY : {
                    ratePerHour: {type: Number,default:0},
                },
                PER_DAY:{
                    ratePerDay: {type: Number,default:0},
                },
                commissionType:{type: String, enum: CommissionType, default:CommissionType.FLAT},
                commissionValue:{type: Number, default:0}
            }
        ]
    })
    pricingTiers : PricingTierDTO[];
    
    @Prop({default:true})
    isActive: boolean;

    @Prop({default:0})
    avgRating: number;

    @Prop({default:0})
    totalRatings:number;
}

export const ServiceSchema = SchemaFactory.createForClass(ServiceEntity);

