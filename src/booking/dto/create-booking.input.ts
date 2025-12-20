import { IsEnum, IsISO8601, IsMongoId, IsNumber, IsOptional, IsString, Min, ValidateIf } from "class-validator";
import { PricingMode } from "../enums";
import { BookingType } from "../enums/booking-type.enum";


export class CreateBookingInput {

    @IsOptional()
    @IsString()
    workDescription?: string;

    @IsMongoId()
    serviceId: string;

    @IsMongoId()
    serviceTierId: string;

    @IsEnum(PricingMode)
    pricingMode: PricingMode;

    @IsNumber()
    numberOfWorkers: number;

    @IsEnum(BookingType)
    bookingType: BookingType;

    @ValidateIf(o => o.bookingType === BookingType.SCHEDULED)
    @IsISO8601()
    startDateTime: string;

    @ValidateIf(o => o.pricingMode === PricingMode.HOURLY)
    @IsNumber()
    @Min(1)
    estimatedHours?: number;

    @ValidateIf(o => o.pricingMode.PER_DAY)
    @IsNumber()
    @Min(1)
    estimatedDays?: number;
}