import { ApiProperty } from '@nestjs/swagger';

export class UserDocumentDTO {
    @ApiProperty({ example: 'identity' })
    category: string;

    @ApiProperty({ example: 'passport' })
    documentType: string;

    @ApiProperty({ example: 'passport_front.jpg' })
    fileName: string;

    @ApiProperty({ example: '/uploads/documents/passport_front.jpg' })
    filePath: string;

    @ApiProperty({ example: 'image/jpeg' })
    fileType: string;
}