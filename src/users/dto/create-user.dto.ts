import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDto {

    @ApiProperty({ example: 'exapmle@email.com', description: 'Unique user`s email' })
    @IsString({ message: 'Must be string' })
    @IsEmail({}, { message: 'Incorrect email format' })
    readonly email: string;

    @ApiProperty({ example: 'qwerty', description: 'User`s password' })
    @IsString({ message: 'Must be string'})
    @Length(4, 16, { message: 'Password length must be between 4 and 16' })
    readonly password: string;
}