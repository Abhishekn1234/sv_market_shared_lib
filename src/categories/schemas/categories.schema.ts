import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { BaseTimestamp } from "../../interfaces";

export type CategoriesDocument = HydratedDocument<CategoriesEntity & BaseTimestamp>;

@Schema({ collection: "categories", timestamps: true, versionKey: false })
export class CategoriesEntity {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    slug: string;

    @Prop()
    iconUrl?: string;

    @Prop()
    iconPublicId?: string;
}

export const CategoriesSchema = SchemaFactory.createForClass(CategoriesEntity);