import { UseGuards, applyDecorators } from "@nestjs/common";
import { Roles } from "./roles-auth.decorator";
import { RolesGuard } from "./roles.guard";

export const Auth = (...roles: string[] | undefined) => {
    return applyDecorators(
        Roles(roles),
        UseGuards(RolesGuard)
    );
}