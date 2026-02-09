import { LanguageCode } from "../../enums";
import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Language {


  @Prop({
    type: String,
    enum: Object.values(LanguageCode),
    default: LanguageCode.EN,
  })
  language: LanguageCode;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);