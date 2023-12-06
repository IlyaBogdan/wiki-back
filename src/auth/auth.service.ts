import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto as UserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async login(userDto: UserDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async registration(userDto: UserDto) {
        const candidate = await this.usersService.getUserByEmail(userDto.email);

        if (candidate) {
            throw new HttpException('User with given email already exists', HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.usersService.create({ ...userDto, password: hashPassword});

        return this.generateToken(user);
    }

    verifyHeader(authHeader: string) {
        const bearer = authHeader.split(' ')[0];
        const token = authHeader.split(' ')[1];

        if (bearer !== 'Bearer' || !token) {
            throw new HttpException('You have no roles for this request', HttpStatus.FORBIDDEN);
        }

        return this.jwtService.verify(token);
    }

    async loginedUser(headers: any) {
        const authHeader = headers.authorization;
        if (!authHeader) {
            return;
        } 

        const userEncoded = this.verifyHeader(authHeader);
        return await this.usersService.getById(userEncoded.id);
    }

    private async generateToken(user: User) {
        const payload = { email: user.email, id: user.id, roles: [user.roles], profile: user.profile };

        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: UserDto) {
        const user = await this.usersService.getUserByEmail(userDto.email);

        if (user) {
            const passwordEquals = await bcrypt.compare(userDto.password, user.password);

            if (passwordEquals) return user;
        }
        
        
        throw new UnauthorizedException({ message: 'Incorrect email or password'});
    }


}
