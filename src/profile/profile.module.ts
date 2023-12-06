import { Module, forwardRef } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profile } from './profile.model';
import { User } from 'src/users/users.model';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Profile, User]),
    forwardRef(() => UsersModule)
  ],
  providers: [ProfileService],
  exports: [ProfileService]
})
export class ProfileModule {}
