import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type DocumentEntityDocument = HydratedDocument<DocumentEntity>;

@Schema({collection:"user-documents",timestamps:true,versionKey:false})
export class DocumentEntity {

    @Prop({ required: true })
    documentType: string;

    @Prop({ required: true })
    fileName: string;

    @Prop({ required: true })
    filePath: string;

    @Prop({ required: true })
    fileType: string;

    @Prop({requiredPaths:true})
    filePublicId: string;

}

export const DocumentSchema = SchemaFactory.createForClass(DocumentEntity);
