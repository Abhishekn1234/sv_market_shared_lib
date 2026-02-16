import {
  IsEnum,
  IsISO8601,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
  ValidateNested,
} from "class-validator";
import { PricingMode } from "../enums";
import { BookingType } from "../enums/booking-type.enum";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { GeoPointDTO } from "./geo-point.dto";

export class CreateBookingInput {

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  workDescription?: string;

  // ✅ Service ID (Optional now)
  @ApiPropertyOptional()
  @IsOptional()
  @IsMongoId()
  serviceId?: string;

  // ✅ Service Tier ID (Optional now)
  @ApiPropertyOptional()
  @IsOptional()
  @IsMongoId()
  serviceTierId?: string;

  @ApiPropertyOptional({ enum: PricingMode })
  @IsOptional()
  @IsEnum(PricingMode)
  pricingMode?: PricingMode;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  numberOfWorkers?: number;

  @ApiPropertyOptional({ enum: BookingType })
  @IsOptional()
  @IsEnum(BookingType)
  bookingType?: BookingType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  startDateTime?: string;

  @ApiPropertyOptional()
  @ValidateIf(o => o.pricingMode === PricingMode.HOURLY)
  @IsNumber()
  @Min(1)
  estimatedHours?: number;

  @ApiPropertyOptional()
  @ValidateIf(o => o.pricingMode === PricingMode.PER_DAY)
  @IsNumber()
  @Min(1)
  estimatedDays?: number;

  // ✅ Added totalCost
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  totalCost?: number;

  @ApiPropertyOptional({
    description: "Current location of the customer or selected location (GeoJSON Point)",
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => GeoPointDTO)
  location?: GeoPointDTO;
  @IsOptional()
  @IsString()
  memberDiscount?:number;

  @IsOptional()
  @IsString()
  serviceFee?:number;


}
