import { ApiProperty } from "@nestjs/swagger";
import { Model, Column, DataType, Table } from "sequelize-typescript";

interface UserCreationAttrs {
    email: string;
    password: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {

    @ApiProperty({ example: 1, description: 'Unique user`s identificator'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({ example: 'exapmle@email.com', description: 'Unique user`s email'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({ example: 'qwerty', description: 'User`s password'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;
}