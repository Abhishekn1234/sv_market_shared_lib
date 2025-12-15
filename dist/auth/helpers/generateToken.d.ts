import { JwtService } from "@nestjs/jwt";
import { UserEntityDocument } from "../../users/schemas/user.schema";
export declare function generateTokens(jwtService: JwtService, user: UserEntityDocument): {
    accessToken: string;
    refreshToken: string;
};
