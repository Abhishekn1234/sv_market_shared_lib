import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";
import { ServiceDocument } from "../schemas/service.schema";
import { CategoriesDTO } from "../../categories/dto/categories.dto";
import { PricingTierDTO } from "./prcing-tier.dto";

export class ServiceDTO {
    @ApiProperty({
        example: '507f1f77bcf86cd799439011',
        description: 'Service ID',
    })
    _id: Types.ObjectId;

    @ApiProperty({
        example: 'Plumbing',
        description: 'Service name',
    })
    name: string;

    @ApiProperty({
        example: 'plumbing',
        description: 'Service slug',
    })
    slug: string;

    @ApiProperty({
        type: () => CategoriesDTO,
        description: 'Category details',
    })
    category: CategoriesDTO;

    @ApiProperty({
        example: 'https://res.cloudinary.com/demo/image/upload/v1234567890/services/icon.png',
        description: 'Service icon URL',
    })
    iconUrl: string;

    @ApiProperty({
        example: 'services/icon_abc123',
        description: 'Cloudinary public ID for the icon',
    })
    iconPublicId: string;

    @ApiProperty({
        example: 'https://res.cloudinary.com/demo/image/upload/v1234567890/services/thumbnail.png',
        description: 'Service thumbnail URL',
    })
    thumbnailUrl: string;

    @ApiProperty({
        example: 'services/thumbnail_abc123',
        description: 'Cloudinary public ID for the thumbnail',
    })
    thumbnailPublicId: string;

    @ApiProperty({
        example: 'Professional plumbing services for residential and commercial properties',
        description: 'Service description',
    })
    description: string;

    @ApiProperty({
        example: '2023-12-03T10:30:00.000Z',
        description: 'Service creation timestamp',
    })
    createdAt: Date;

    @ApiProperty({
        example: '2023-12-03T10:30:00.000Z',
        description: 'Service last update timestamp',
    })
    updatedAt: Date;

    @ApiProperty({
        example: 'SAR',
        description: 'Service currency',
    })
    currency: string;

    @ApiProperty({
        type: [PricingTierDTO],
        description: 'Service pricing tiers',
    })
    pricingTiers: PricingTierDTO[];

    constructor(service: ServiceDocument) {
        this._id = service._id;
        this.name = service.name;
        this.slug = service.slug;
        this.category = service.category as unknown as CategoriesDTO;
        this.iconUrl = service.iconUrl;
        this.iconPublicId = service.iconPublicId;
        this.thumbnailUrl = service.thumbnailUrl;
        this.thumbnailPublicId = service.thumbnailPublicId;
        this.description = service.description;
        this.currency = service.currency;
        this.createdAt = service.createdAt;
        this.updatedAt = service.updatedAt;
        this.pricingTiers = service.pricingTiers;
    }
}