import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ example: 'exapmle@email.com', description: 'Unique user`s email'})
    readonly email: string;

    @ApiProperty({ example: 'qwerty', description: 'User`s password'})
    readonly password: string;
}