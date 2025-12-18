import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PaginationInput {
    @ApiProperty({
        example: 1,
        description: 'Page number',
        required: false,
        type: Number,
    })
    @Type(() => Number)
    @IsOptional()
    page: number = 1;

    @ApiProperty({
        example: 10,
        description: 'Number of items per page',
        required: false,
        type: Number,
    })
    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    limit: number = 10;

    @ApiProperty({
        example: 'createdAt:desc',
        description: 'Sorting rule (field:direction)',
        required: false,
        type: String,
    })
    @IsOptional()
    @Transform(({ value }) => {
        if (!value) return { createdAt: "desc" };

        const [field, order] = value.split(':');
        return {
            [field]: order === 'asc' ? "asc" : "desc"
        };
    })
    sort: Record<string, "asc" | "desc"> = { createdAt: "desc" };

    @ApiProperty({
        example: 'search keyword',
        description: 'Search query',
        required: false,
        type: String,
    })
    @IsString()
    @IsOptional()
    search?: string;
}