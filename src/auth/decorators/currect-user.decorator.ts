import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtUser } from "../interfaces";

export const CurrentUser = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext):JwtUser => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
});
