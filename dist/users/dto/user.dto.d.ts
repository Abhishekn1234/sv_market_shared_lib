import { UserGroupResponseDTO } from "../../user-groups/dto/userGroupResponse.dto";
import { UserDocumentDTO } from "./user-document.dto";
import { UserEntityDocument } from "../schemas/user.schema";
import { KycStatus } from '../../enums';
export declare class UserDTO {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    isVerified: boolean;
    kycStatus: KycStatus;
    address: string;
    profilePictureUrl: string;
    profilePicturePublicId: string;
    documents: UserDocumentDTO[];
    role: UserGroupResponseDTO;
    constructor(user: UserEntityDocument);
}
