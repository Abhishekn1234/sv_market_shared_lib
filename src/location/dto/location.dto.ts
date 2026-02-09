import { IsOptional, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsOptional()
  @IsString()
  home?: string;

  @IsOptional()
  @IsString()
  office?: string;
}