import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User) private readonly userRepository: typeof User
    ) {}

    async create(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        return user;
    }

    async getAll() {
        const users = await this.userRepository.findAll();
        return users;
    }
}
