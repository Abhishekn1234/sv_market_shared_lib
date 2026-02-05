import { IsEnum, IsMongoId, IsNotEmpty } from "class-validator";
import { OTPPurpose } from "../enums/otp-purpose.enum";
import { ApiProperty } from "@nestjs/swagger";

export class GenerateOTPInput {
    @ApiProperty({ description: 'Booking ID for which OTP is being generated' })
    @IsNotEmpty()
    @IsMongoId()
    bookingId: string;

    @ApiProperty({ enum: OTPPurpose, description: 'Purpose of the OTP - work start or completion' })
    @IsEnum(OTPPurpose)
    purpose: OTPPurpose;
}
