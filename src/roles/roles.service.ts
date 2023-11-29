import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { RoleValue } from './roles.types';

@Injectable()
export class RolesService {

    constructor(
        @InjectModel(Role) private readonly roleRepository: typeof Role
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
}
