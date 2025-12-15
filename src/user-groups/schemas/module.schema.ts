import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type ModuleEntityDocument = HydratedDocument<ModuleEntity>;

@Schema({timestamps:false,versionKey:false})
export class ModuleEntity {
    @Prop({required:true, unique:true})
    module: string;

    @Prop({required:true})
    moduleLanguageKey: string;

    @Prop({default:0})
    sort: number;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref:ModuleEntity.name, default: null})
    parent: string | null;
}

export const ModuleSchema = SchemaFactory.createForClass(ModuleEntity);