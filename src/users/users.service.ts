import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User) private readonly userRepository: typeof User,
        private readonly roleService: RolesService
    ) {}

    async create(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue("USER");

        await user.$set('roles', [role.id]);
        user.roles = [role];
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
        const user = await this.userRepository.findByPk(dto.userId);

        if (role && user) {
            await user.$add('role', role.id);
            return dto;
        }

        throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
    }
}
