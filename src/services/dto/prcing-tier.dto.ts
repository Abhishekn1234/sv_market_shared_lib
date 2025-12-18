import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsMongoId, IsNumber, IsObject } from "class-validator";
import { Types } from "mongoose"
import { CommissionType } from "../../enums";


export class PricingTierDTO {
    @ApiProperty({
        example: '507f1f77bcf86cd799439011',
        description: 'Tier ID (MongoDB ObjectId)',
    })
    @IsMongoId()
    tierId: Types.ObjectId;
    @ApiProperty({
        example: { ratePerHour: 10 },
        description: 'Hourly rate (optional)',
    })
    @IsObject()
    HOURLY?: { ratePerHour: number };
    @ApiProperty({
        example: { ratePerDay: 10 },
        description: 'Daily rate (optional)',
    })
    @IsObject()
    PER_DAY?: { ratePerDay: number };
    @ApiProperty({
        example: 'FLAT',
        description: 'Commission type (FLAT or PERCENTAGE)',
    })
    @IsEnum(CommissionType)
    commissionType: CommissionType;
    @ApiProperty({
        example: 2,
        description: 'Commission value',
    })
    @IsNumber()
    commissionValue: number;
}