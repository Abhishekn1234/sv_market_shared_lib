import { ApiProperty } from "@nestjs/swagger";
import { CategoriesDocument } from "../schemas/categories.schema";

export class CategoriesDTO {
    @ApiProperty({
        example: '507f1f77bcf86cd799439011',
        description: 'Category ID',
    })
    _id: string;

    @ApiProperty({
        example: 'Electronics',
        description: 'Category name',
    })
    name: string;

    @ApiProperty({
        example: 'electronics',
        description: 'Category slug',
    })
    slug: string;

    @ApiProperty({
        example: 'https://res.cloudinary.com/demo/image/upload/v1234567890/categories/icon.png',
        description: 'Category icon URL',
    })
    iconUrl: string;
    @ApiProperty({
        example: 'Category for all electronic products',
        description: 'Category description',
    })
    description?: string;

    @ApiProperty({
        example: '2023-12-03T10:30:00.000Z',
        description: 'Category creation timestamp',
    })
    createdAt: Date;

    @ApiProperty({
        example: '2023-12-03T10:30:00.000Z',
        description: 'Category last update timestamp',
    })
    updatedAt: Date;

    constructor(category: CategoriesDocument) {
        this._id = category._id.toString();
        this.name = category.name;
        this.slug = category.slug;
        this.description = category.description;
        this.iconUrl = category.iconUrl;
        this.createdAt = category.createdAt;
        this.updatedAt = category.updatedAt;
    }
}