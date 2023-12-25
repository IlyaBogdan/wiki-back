import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { User } from 'src/users/users.model';
import { UserRoles } from './user-roles.model';
import { RolesProvider } from './roles.provider';

@Module({
  imports: [SequelizeModule.forFeature([Role, User, UserRoles])],
  providers: [RolesService, ...RolesProvider],
  controllers: [RolesController],
  exports: [RolesService, ...RolesProvider]
})
export class RolesModule {}
