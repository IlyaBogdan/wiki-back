import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { RoleValue as RolesTypes } from 'src/roles/roles.types';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ) {}

    @ApiOperation({ summary: 'Creeate new user'})
    @ApiResponse({ status: 200, type: User})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.create(userDto);
    }

    @ApiOperation({ summary: 'Get user info'})
    @ApiResponse({ status: 200, type: User})
    @Get(':id/')
    read(@Param('id') id: number) {
        console.log(id);
        return this.usersService.getById(id);
    }

    @ApiOperation({ summary: 'Update user info'})
    @ApiResponse({ status: 200, type: User})
    @UsePipes(ValidationPipe)
    @Patch(':id/')
    update(@Param('id') id: number, @Body() userDto: CreateUserDto) {
        return this.usersService.update(id, userDto);
    }

    @ApiOperation({ summary: 'Delete user and return it'})
    @ApiResponse({ status: 200, type: User})
    @Delete(':id/')
    delete(@Param('id') id: number) {
        return this.usersService.delete(id);
    }

    @ApiOperation({ summary: 'Get all users'})
    @ApiResponse({ status: 200, type: [User]})
    @Roles(RolesTypes.GLOBAL_ADMIN)
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.usersService.getAll();
    }

    @ApiOperation({ summary: 'Assign Role'})
    @ApiResponse({ status: 200})
    @Roles(RolesTypes.GLOBAL_ADMIN)
    @UseGuards(RolesGuard)
    @Post('/role')
    assignRole(@Body() addRoleDto: AddRoleDto) {
        return this.usersService.assignRole(addRoleDto);
    }

}
