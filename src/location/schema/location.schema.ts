import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LocationDocument = Location & Document;

@Schema({ timestamps: true })
export class Location {
  @Prop({ default: '' })
  home: string;

  @Prop({ default: '' })
  office: string;
  
  @Prop({default:''})
  inputValue:string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);