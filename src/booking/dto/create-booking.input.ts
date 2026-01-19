import { IsEnum, IsISO8601, IsMongoId, IsNumber, IsObject, IsOptional, IsString, Min, ValidateIf, ValidateNested } from "class-validator";
import { PricingMode } from "../enums";
import { BookingType } from "../enums/booking-type.enum";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { GeoPointDTO } from "./geo-point.dto";


export class CreateBookingInput {

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    workDescription?: string;

    @ApiProperty()
    @IsMongoId()
    serviceId: string;

    @ApiProperty()
    @IsMongoId()
    serviceTierId: string;

    @ApiProperty({ enum: PricingMode })
    @IsEnum(PricingMode)
    pricingMode: PricingMode;

    @ApiProperty()
    @IsNumber()
    numberOfWorkers: number;

    @ApiProperty({ enum: BookingType })
    @IsEnum(BookingType)
    bookingType: BookingType;

    @ApiProperty()
    @ValidateIf(o => o.bookingType === BookingType.SCHEDULED)
    @IsISO8601()
    startDateTime: string;

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

    @ApiProperty({
        description: 'Current location of the customer or selected location (GeoJSON Point)'
    })
    @ValidateNested()
    @Type(() => GeoPointDTO)
    location: GeoPointDTO;
}