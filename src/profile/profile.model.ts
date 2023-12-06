import { ApiProperty } from "@nestjs/swagger";
import { Model, Column, DataType, Table, ForeignKey } from "sequelize-typescript";
import { User } from "src/users/users.model";

interface ProfileCreationAttrs {
    phone: string;
    profession: string,
    userId: number;
}

@Table({tableName: 'profile'})
export class Profile extends Model<Profile, ProfileCreationAttrs> {

    @ApiProperty({ example: 1, description: 'Primary key'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({ example: 'Johnny', description: 'First Name'})
    @Column({type: DataType.STRING, unique: true})
    first_name: string;

    @ApiProperty({ example: 'Silverhand', description: 'Last Name'})
    @Column({type: DataType.STRING, unique: true})
    last_name: string;

    // @ApiProperty({ example: 'Silverhand', description: 'Last Name'})
    // @Column({type: DataType.STRING, unique: true})
    // avatar: string;

    @ApiProperty({ example: '89081112767', description: 'User phone'})
    @Column({type: DataType.STRING, unique: true})
    phone: string;

    @ApiProperty({ example: 'JavaScript Developer', description: 'User Profession'})
    @Column({type: DataType.STRING})
    profession: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;
}