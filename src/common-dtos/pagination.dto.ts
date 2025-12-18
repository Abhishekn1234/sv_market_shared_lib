import { ApiProperty } from '@nestjs/swagger';

export class PaginationDTO {
    @ApiProperty({ example: 100 })
    totalItems: number;

    @ApiProperty({ example: 10 })
    totalPages: number;

    @ApiProperty({ example: 1 })
    currentPage: number;

    @ApiProperty({ example: true })
    hasNextPage: boolean;

    @ApiProperty({ example: false })
    hasPrevPage: boolean;
}