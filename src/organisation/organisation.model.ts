import { ApiProperty } from "@nestjs/swagger";
import { Model, Column, DataType, Table, BelongsToMany, ForeignKey } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";
import { User } from "src/users/users.model";

interface OrganisationCreationAttrs {
    title: string
}

@Table({tableName: 'organisations'})
export class Organisation extends Model<Organisation, OrganisationCreationAttrs> {

    @ApiProperty({ example: 1, description: 'Unique organisation`s identificator'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({ example: 'Dungeon Corporation', description: 'Organisation`s title'})
    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    ownerId: number;
}