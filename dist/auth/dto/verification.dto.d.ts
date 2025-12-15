import { UserDTO } from "../../users";
export declare class VerificationDTO {
    accessToken: string;
    refreshToken: string;
    user: Partial<UserDTO>;
}
