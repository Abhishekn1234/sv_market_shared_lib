import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { KycStatus } from "../../enums/kycStatus.enum";
import { UserGroup } from "../../user-groups/schemas/user-group.schema";
import { DocumentEntity } from "./user-documents.schema";

export type UserEntityDocument = HydratedDocument<UserEntity>

@Schema({ collection: "users", timestamps: true, versionKey: false })
export class UserEntity {
    @Prop({ required: true })
    fullName: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    phone: string;

    @Prop({ required: true, default: "" })
    password: string;

    @Prop({ default: false })
    isVerified: boolean;

    @Prop({ default: KycStatus.NOT_SUBMITTED })
    kycStatus: KycStatus;

    @Prop({ default: "" })
    address: string;

    @Prop({ default: "" })
    profilePictureUrl: string;

    @Prop({ default: "" })
    profilePicturePublicId: string;

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: DocumentEntity.name }],
        default: []
    })
    documents: string[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: UserGroup.name, required: true })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);