import { ModuleEntity } from '../schemas/module.schema';
export declare class UserGroupResponseDTO {
    _id: string;
    name: string;
    modules: ModuleEntity[];
    createdAt: Date;
    updatedAt: Date;
    constructor(group: any);
}
