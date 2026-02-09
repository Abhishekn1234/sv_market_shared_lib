import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SelectLanguageDto {
  @ApiProperty({ example: 'en', description: 'Language code' })
  @IsString()
  language: string;
}
