"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokens = generateTokens;
function generateTokens(jwtService, user) {
    const accessToken = jwtService.sign({
        id: user._id,
        email: user.email
    }, {
        expiresIn: "1h"
    });
    const refreshToken = jwtService.sign({
        id: user._id,
        email: user.email,
    }, {
        expiresIn: "7d"
    });
    return { accessToken, refreshToken };
}
//# sourceMappingURL=generateToken.js.map