import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthService } from 'src/auth/auth.service';
import { RolesService } from 'src/roles/roles.service';
import { RoleValue } from 'src/roles/roles.types';
import { User } from 'src/users/users.model';
import { Organisation } from './organisation.model';
import { CreateOrganisationDto } from './dto/create.dto';
import { UsersService } from 'src/users/users.service';
import { Role } from 'src/roles/roles.model';

@Injectable()
export class OrganisationService {

    constructor(
        private readonly authService: AuthService,
        private readonly rolesService: RolesService,
        private readonly usersService: UsersService,

        @InjectModel(Organisation) private readonly organisationRepository: typeof Organisation,
        @InjectModel(Role) private readonly roleRepository: typeof Role
    ) {}

    async onModuleInit() {
        const organisations = await this.organisationRepository.findAll();

        if (organisations.length == 0) {
            const testUserId = 2;
            this.create({ title: 'test', ownerId: testUserId });
        }
    }

    async create(dto: CreateOrganisationDto) {
        const organisation = await this.organisationRepository.create(dto);
        return organisation;
    }

    async all(payload: { headers: any, userId: number|null }) {
        const user = await this.authService.loginedUser(payload.headers);

        if (payload.userId) {
            if (user.id == payload.userId || this.rolesService.checkUserRole(user, RoleValue.GLOBAL_ADMIN)) {
                return await this.userOrganisations(user);
            } else {
                throw new HttpException('Not enough rules', HttpStatus.FORBIDDEN);
            }
        } else {
            if(this.rolesService.checkUserRole(user, RoleValue.GLOBAL_ADMIN)) {
                return await this.userOrganisations(user);
                return await this.organisationRepository.findAll();
            } else {
                return await this.userOrganisations(user);
            }
        }
    }

    async userOrganisations(user: User) {

        const roles = this.roleRepository.findAll({ where: { users: [user] }});
        console.log(roles, user);
    }
}
