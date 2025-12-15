import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET environment variable is not defined');
        }
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtRefreshStrategy.extractTokenFromBody
            ]),
            secretOrKey: jwtSecret,
            ignoreExpiration: false,
            algorithms: ["HS256"]
        })
    }

    private static extractTokenFromBody(req: Request): string | null {
        if (req.body && req.body.refreshToken) {
            return req.body.refreshToken;
        }
        return null;
    }


    async validate(payload: any) {
        if (!payload) {
            throw new UnauthorizedException('Invalid refresh token');
        }
        return payload;
    }
}