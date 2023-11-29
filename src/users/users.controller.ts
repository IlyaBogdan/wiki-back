import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ) {}

    @Post()
    create(@Body() userDto: CreateUserDto) {
        console.log(userDto);
        return this.usersService.create(userDto);
    }

    @Get()
    getAll() {
        return this.usersService.getAll();
    }
}
