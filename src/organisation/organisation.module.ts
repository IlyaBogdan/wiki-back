import { Module, forwardRef } from '@nestjs/common';
import { OrganisationController } from './organisation.controller';
import { OrganisationService } from './organisation.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Organisation } from './organisation.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Organisation]),
    RolesModule,
    forwardRef(() => AuthModule),
    UsersModule
  ],
  controllers: [OrganisationController],
  providers: [OrganisationService]
})
export class OrganisationModule {}
