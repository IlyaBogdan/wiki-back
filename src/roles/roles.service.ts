import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { RoleValue } from './roles.types';
import { User } from 'src/users/users.model';
import { repos } from 'consts/consts';
import { UsersService } from 'src/users/users.service';
import { UserRoles } from './user-roles.model';

@Injectable()
export class RolesService {

    constructor(
        @InjectModel(Role) private readonly roleRepository: typeof Role,
        @Inject(repos.roles) private readonly rolesMapRepository: typeof UserRoles
    ) {}

    async onModuleInit() {
        const roles = await this.allRoles();

        if (roles.length == 0) {
            for (const [index, value] of Object.entries(RoleValue)) {
                this.create({ value });
            }
        }
    }

    async create(dto: CreateRoleDto) {
        const role = await this.roleRepository.create(dto);
        return role;
    }

    async allRoles() {
        return await this.roleRepository.findAll();
    }

    async getRoleByValue(value: string) {
        const role = await this.roleRepository.findOne({ where: {value} });
        return role;
    }

    async checkUserRole(user: User, role: RoleValue, organisationId: number = null): Promise<boolean> {
        if (organisationId == null && role != RoleValue.GLOBAL_ADMIN) {
            throw new Error('Passed required param organisationId');
        } else {

        }

        const roleId = (await this.getRoleByValue(role)).id;
        const userRoles = await this.rolesMapRepository.findAll({ where: { organisationId, roleId, userId: user.id }});

        return userRoles.length ? true : false;
    }
}
