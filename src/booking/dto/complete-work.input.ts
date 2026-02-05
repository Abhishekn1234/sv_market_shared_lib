import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CompleteWorkInput {
    @ApiProperty({ description: 'Booking ID' })
    @IsNotEmpty()
    @IsMongoId()
    bookingId: string;

    @ApiPropertyOptional({ description: 'Actual hours worked (for hourly pricing)', minimum: 0.5 })
    @IsOptional()
    @IsNumber()
    @Min(0.5)
    actualWorkHours?: number;

    @ApiPropertyOptional({ description: 'Actual days worked (for daily pricing)', minimum: 1 })
    @IsOptional()
    @IsNumber()
    @Min(1)
    actualWorkDays?: number;
}
