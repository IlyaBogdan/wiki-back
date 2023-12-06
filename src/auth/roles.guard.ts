import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles-auth.decorator";
import { CreateRoleDto as RoleType } from "src/roles/dto/create-role.dto";
import { AuthService } from "./auth.service";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector,
        private readonly authService: AuthService
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        try {

            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ]);

            if (!requiredRoles) {
                return true;
            }

            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;

            const user = this.authService.verifyHeader(authHeader);
            
            req.user = user;

            return user.roles[0].some((role: RoleType) => requiredRoles.includes(role.value));

        } catch (e) {
            throw new HttpException('You have no roles for this request', HttpStatus.FORBIDDEN);
        }
    }
}