import { Module } from '@nestjs/common';
import { OrganisationController } from './organisation.controller';
import { OrganisationService } from './organisation.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Organisation } from './organisation.model';

@Module({
  imports: [SequelizeModule.forFeature([Organisation])],
  controllers: [OrganisationController],
  providers: [OrganisationService]
})
export class OrganisationModule {}
