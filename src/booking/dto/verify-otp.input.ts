import { IsEnum, IsMongoId, IsNotEmpty, IsString, Length } from "class-validator";
import { OTPPurpose } from "../enums/otp-purpose.enum";
import { ApiProperty } from "@nestjs/swagger";

export class VerifyOTPInput {
    @ApiProperty({ description: 'Booking ID' })
    @IsNotEmpty()
    @IsMongoId()
    bookingId: string;

    @ApiProperty({ description: '6-digit OTP code', example: '123456' })
    @IsNotEmpty()
    @IsString()
    @Length(6, 6)
    otp: string;

    @ApiProperty({ enum: OTPPurpose, description: 'Purpose of OTP verification' })
    @IsEnum(OTPPurpose)
    purpose: OTPPurpose;
}
