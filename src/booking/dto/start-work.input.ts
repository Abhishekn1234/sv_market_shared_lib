import { IsMongoId, IsNotEmpty, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class StartWorkInput {
    @ApiProperty({ description: 'Booking ID' })
    @IsNotEmpty()
    @IsMongoId()
    bookingId: string;

    @ApiProperty({ description: '6-digit OTP code provided by customer', example: '123456' })
    @IsNotEmpty()
    @IsString()
    @Length(6, 6)
    otp: string;
}
