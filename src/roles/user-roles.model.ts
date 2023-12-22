import { Model, Column, DataType, Table, ForeignKey } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Role } from "./roles.model";
import { Organisation } from "src/organisation/organisation.model";


@Table({tableName: 'user_roles', createdAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER})
    roleId: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @ForeignKey(() => Organisation)
    @Column({type: DataType.INTEGER})
    organisationId: number;
}