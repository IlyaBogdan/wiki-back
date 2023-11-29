import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';

@Injectable()
export class RolesService {

    constructor(
        @InjectModel(Role) private readonly roleRepository: typeof Role
    ) {}

    async onModuleInit() {
        const roles = await this.allRoles();

        if (roles.length == 0) {
            this.create({ value: "USER" });
            this.create({ value: "ADMIN" });
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
