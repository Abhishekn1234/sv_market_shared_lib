import { ApiProperty } from '@nestjs/swagger';
import { UserGroupResponseDTO } from "../../user-groups/dto/userGroupResponse.dto";
import { UserDocumentDTO } from "./user-document.dto";
import { UserEntityDocument } from "../schemas/user.schema";
import { KycStatus } from '../../enums';

export class UserDTO {
    @ApiProperty({ example: '507f1f77bcf86cd799439011' })
    _id: string;

    @ApiProperty({ example: 'John Doe' })
    fullName: string;

    @ApiProperty({ example: 'john.doe@example.com' })
    email: string;

    @ApiProperty({ example: '+1234567890' })
    phone: string;

    @ApiProperty({ example: true })
    isVerified: boolean;

    @ApiProperty({ example: 'APPROVED', enum: KycStatus })
    kycStatus: KycStatus;

    @ApiProperty({ example: '123 Main Street, City, State' })
    address: string;

    @ApiProperty({ example: 'https://example.com/profile.jpg' })
    profilePictureUrl: string;

    @ApiProperty({ example: 'cloudinary_public_id_123' })
    profilePicturePublicId: string;

    @ApiProperty({ type: [UserDocumentDTO] })
    documents: UserDocumentDTO[];

    @ApiProperty({ type: UserGroupResponseDTO })
    role: UserGroupResponseDTO;

    constructor(user: UserEntityDocument) {
        this._id = user._id as any;
        this.fullName = user.fullName;
        this.email = user.email;
        this.phone = user.phone;
        this.isVerified = user.isVerified;
        this.kycStatus = user.kycStatus;
        this.address = user.address;
        this.profilePictureUrl = user.profilePictureUrl;
        this.profilePicturePublicId = user.profilePicturePublicId;
        this.documents = user.documents as unknown as UserDocumentDTO[];
        this.role = user.role as unknown as UserGroupResponseDTO;
    }
}