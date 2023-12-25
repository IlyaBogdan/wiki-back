import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthService } from 'src/auth/auth.service';
import { RolesService } from 'src/roles/roles.service';
import { RoleValue } from 'src/roles/roles.types';
import { User } from 'src/users/users.model';
import { Organisation } from './organisation.model';
import { CreateOrganisationDto } from './dto/create.dto';
import { repos } from 'consts/consts';
import { UserRoles } from 'src/roles/user-roles.model';

@Injectable()
export class OrganisationService {

    constructor(
        private readonly authService: AuthService,
        private readonly rolesService: RolesService,

        @InjectModel(Organisation) private readonly organisationRepository: typeof Organisation,
        @Inject(repos.roles) private readonly roleRepository: typeof UserRoles
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
        const role = await this.rolesService.getRoleByValue(RoleValue.ORGANISATION_ADMIN);
        this.roleRepository.create({ organisationId: organisation.id, userId: dto.ownerId, roleId: role.id });
        

        return organisation;
    }

    async update(organisationId: number, dto: CreateOrganisationDto) {
        const organisation = await this.organisationRepository.findByPk(organisationId);
        Object.assign(organisation, dto);
        await organisation.save();

        return organisation;
    }

    async delete(organisationId: number) {
        const organisation = await this.organisationRepository.findByPk(organisationId);
        await organisation.destroy();

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
                return await this.organisationRepository.findAll();
            } else {
                return await this.userOrganisations(user);
            }
        }
    }

    async userOrganisations(user: User) {

        const roles = await this.roleRepository.findAll({ where: { userId: user.id }});
        const organisationIds = Array.from(new Set(roles.map((role) => role.organisationId)));

        const organisations = await this.organisationRepository.findAll({ where: { id: organisationIds }});
        return organisations;
    }
}
