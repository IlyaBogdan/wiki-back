import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto as UserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
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
}
