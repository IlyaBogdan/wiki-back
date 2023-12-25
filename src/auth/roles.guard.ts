import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles-auth.decorator";
import { CreateRoleDto as RoleType } from "src/roles/dto/create-role.dto";
import { AuthService } from "./auth.service";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector,
        private readonly authService: AuthService
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        try {

            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ]);

            const req = context.switchToHttp().getRequest();
            const user = this.authorizedUser(req);

            req.user = user;

            if (!requiredRoles.length) return true;
            
            return user.roles[0].some((role: RoleType) => requiredRoles.includes(role.value));

        } catch (e) {
            throw new HttpException('You have no roles for this request', HttpStatus.FORBIDDEN);
        }
    }

    private authorizedUser(req: any) {
        const authHeader = req.headers.authorization;
        return this.authService.verifyHeader(authHeader);
    }
}