import { ApiProperty } from '@nestjs/swagger';
import { ModuleEntity } from '../schemas/module.schema';

export class UserGroupResponseDTO {
    @ApiProperty({example: 'eyJhbGci01....'})
    _id: string;

    @ApiProperty({ example: 'Admin' })
    name: string;

    @ApiProperty({ type: [Object], description: 'Array of modules assigned to this user group' })
    modules: ModuleEntity[];

    @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
    createdAt: Date;

    @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
    updatedAt: Date;

    constructor(group: any) {
        this._id = group._id.toString();
        this.name = group.name;
        this.modules = group.modules;
        this.createdAt = group.createdAt;
        this.updatedAt = group.updatedAt;
    }
}