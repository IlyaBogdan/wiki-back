import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/auth.decorator';
import { ProfileDto } from 'src/profile/dto/profile.dto';
import { ProfileService } from 'src/profile/profile.service';

@ApiTags('Profile')
@Controller('profile')
export class UsersProfileController {

    constructor(
        private readonly profileService: ProfileService
    ) {}

    @Auth()
    @Get('/:id')
    userProfile(@Param('id') userId: number) {
        return this.profileService.userInfo(userId);
    }

    @Auth()
    @UsePipes(ValidationPipe)
    @Post('/:id')
    updatePofile(@Param('id') id: number, @Body() dto: ProfileDto) {
        return this.profileService.createOrUpdateProfile(id, dto);
    }

}
