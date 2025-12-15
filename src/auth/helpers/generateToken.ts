import { JwtService } from "@nestjs/jwt";
import { UserEntityDocument } from "../../users/schemas/user.schema";

export function generateTokens(
    jwtService: JwtService,
    user: UserEntityDocument
    ){
    const accessToken = jwtService.sign({
        id: user._id,
        email: user.email
    },{
        expiresIn:"1h"
    });
    const refreshToken = jwtService.sign({
        id: user._id,
        email: user.email,
    },{
        expiresIn:"7d"
    });
    return {accessToken,refreshToken}
}