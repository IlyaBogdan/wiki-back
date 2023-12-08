import { Module, forwardRef } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profile } from './profile.model';
import { User } from 'src/users/users.model';
import { UsersModule } from 'src/users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProfileController } from './profile.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Profile, User]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '/storage'),
      serveRoot: '/storage'
    }),
    forwardRef(() => UsersModule),
    AuthModule
  ],
  providers: [ProfileService],
  controllers: [ProfileController],
  exports: [ProfileService]
})
export class ProfileModule {}
