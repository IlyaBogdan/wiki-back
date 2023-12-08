import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RoleValue as RolesTypes } from 'src/roles/roles.types';
import { RolesGuard } from 'src/auth/roles.guard';
import { Organisation } from './organisation.model';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateOrganisationDto } from './dto/create.dto';
import { Auth } from 'src/auth/auth.decorator';

@Controller('organisation')
export class OrganisationController {

    constructor(
        private readonly organisationService: OrganisationService
    ) {}

    @ApiOperation({ summary: 'Create organisation'})
    @ApiResponse({ status: 200, type: [Organisation]})
    @Auth()
    @Post()
    create(@Body() createDto: CreateOrganisationDto) {
        //return this.organisationService.create()
    }
}
