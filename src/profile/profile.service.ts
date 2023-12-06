import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from './profile.model';
import { UsersService } from 'src/users/users.service';
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfileService {

    constructor(
        @InjectModel(Profile) private readonly profileRepository: typeof Profile,
        private readonly usersService: UsersService
    ) {}

    async userProfile(userId: number) {
        await this.usersService.getById(userId);
        const profile = await this.profileRepository.findOne({ where: { userId }});

        return profile;
    }

    async userInfo(userId: number) {
        const user = await this.usersService.getById(userId, true);

        return user;
    }

    async createOrUpdateProfile(userId: number, dto: ProfileDto) {
        await this.usersService.getById(userId);
        let profile = await this.userProfile(userId);

        if (!profile) {
            const profileInfo = Object.assign(dto, { userId });
            profile = await this.profileRepository.create(profileInfo);
        } else {
            Object.assign(profile, dto);
            profile.save();
        }

        return profile;
    }
}
