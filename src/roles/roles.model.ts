import { ApiProperty } from "@nestjs/swagger";
import { Model, Column, DataType, Table, BelongsToMany } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRoles } from "./user-roles.model";
import { Organisation } from "src/organisation/organisation.model";

interface RoleCreationAttrs {
    value: string;
    description?: string
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs> {

    @ApiProperty({ example: 1, description: 'Unique identificator'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({ example: 'ADMIN', description: 'User role'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;

    @ApiProperty({ example: 'I am ROOT', description: 'Some description (not requeired)'})
    @Column({type: DataType.STRING, allowNull: true})
    description?: string;

    @BelongsToMany(() => User, () => UserRoles)
    users: User[];

    @BelongsToMany(() => Organisation, () => UserRoles)
    organisations: Organisation[];
}