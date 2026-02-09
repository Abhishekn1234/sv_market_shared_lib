import { IsEnum } from "class-validator";
import { LanguageCode } from "../../enums";
export class SelectLanguageDto {
  @IsEnum(LanguageCode, {
    message: "Language must be en, hi, or ar",
  })
  language: LanguageCode;
}