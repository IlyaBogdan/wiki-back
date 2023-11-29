import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ) {}

    @ApiOperation({ summary: 'Creeate new user'})
    @ApiResponse({ status: 200, type: User})
    @Post()
    create(@Body() userDto: CreateUserDto) {
        console.log(userDto);
        return this.usersService.create(userDto);
    }

    @ApiOperation({ summary: 'Get all users'})
    @ApiResponse({ status: 200, type: [User]})
    @Get()
    getAll() {
        return this.usersService.getAll();
    }
}
