import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { RoleValue } from 'src/roles/roles.types';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User) private readonly userRepository: typeof User,
        private readonly roleService: RolesService
    ) {}

    async create(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue(RoleValue.USER);

        await user.$set('roles', [role.id]);
        user.roles = [role];
        return user;
    }

    async getById(id: number, includeAll=false) {
        const user = await this.userRepository.findByPk(id, includeAll ? { include: { all: true }} : {});
        if (user) return user;

        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    async update(userId: number, dto: CreateUserDto) {
        const user = await this.getById(userId);

        Object.assign(user, dto);
        await user.save();
        
        return user;
    }

    async delete(userId: number) {
        const user = await this.getById(userId);
        await user.destroy();

        return user;
    }

    async getAll() {
        const users = await this.userRepository.findAll({ include: { all: true }});
        return users;
    }

    async getUserByEmail(email: string) {
        return await this.userRepository.findOne({ where: { email }, include: { all: true }});
    }

    async assignRole(dto: AddRoleDto) {
        const role = await this.roleService.getRoleByValue(dto.value);
        const user = await this.getById(dto.userId);

        if (role) {
            await user.$add('role', role.id);
            return dto;
        }

        throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
    }
}
