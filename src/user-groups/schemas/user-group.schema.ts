import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { ModuleEntity } from "./module.schema";

export type UserGroupDocument = HydratedDocument<UserGroup>;

@Schema({timestamps:true,versionKey:false})
export class UserGroup {
    @Prop({required:true, unique:true})
    name: string;

    @Prop({type:[{type: mongoose.Schema.Types.ObjectId, ref:ModuleEntity.name}],required:true})
    modules: string[];
}

export const UserGroupSchema = SchemaFactory.createForClass(UserGroup);