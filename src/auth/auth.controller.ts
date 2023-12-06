import { Body, Controller, Get, Headers, HttpCode, HttpStatus, Post, Res, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto as UserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.model';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService
    ) {}

    @UsePipes(ValidationPipe)
    @Post('/login')
    @HttpCode(HttpStatus.OK)
    login(@Body() userDto: UserDto) {
        return this.authService.login(userDto);
    }

    @UsePipes(ValidationPipe)
    @Post('/registration')
    @HttpCode(HttpStatus.CREATED)
    registration(@Body() userDto: UserDto) {
        return this.authService.registration(userDto);
    }

    @Get('/')
    @HttpCode(HttpStatus.OK)
    authUser(@Headers() headers, @Res() res) {

        return this.authService.loginedUser(headers)
                    .then((user: User) => {
                        res.redirect(`/profile/${user.id}`);
                    });
    }
}
