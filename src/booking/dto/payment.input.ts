import { IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PaymentMethod } from "../schemas/payment.schema";

export class PaymentInput {
    @ApiProperty({ description: 'Booking ID for which payment is being made' })
    @IsNotEmpty()
    @IsMongoId()
    bookingId: string;

    @ApiProperty({ enum: PaymentMethod, description: 'Payment method', example: PaymentMethod.CARD })
    @IsEnum(PaymentMethod)
    paymentMethod: PaymentMethod;

    @ApiPropertyOptional({ description: 'Payment token from payment gateway' })
    @IsOptional()
    @IsString()
    paymentToken?: string;
}
