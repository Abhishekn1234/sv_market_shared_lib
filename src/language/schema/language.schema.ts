import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LanguageDocument = Language & Document;

@Schema({ collection: 'languages' })
export class Language {
  @Prop({ required: true })
  language: string;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);
