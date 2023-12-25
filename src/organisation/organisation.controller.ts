import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards, Headers } from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import { Organisation } from './organisation.model';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateOrganisationDto } from './dto/create.dto';
import { Auth } from 'src/auth/auth.decorator';
import { UpdateOrganisationDto } from './dto/update.dto';

@Controller('organisation')
export class OrganisationController {

    constructor(
        private readonly organisationService: OrganisationService
    ) {}

    @ApiOperation({ summary: 'Organisations list'})
    @ApiResponse({ status: 200, type: [Organisation]})
    @Auth()
    @Get('/all')
    all(@Headers() headers, @Query('userId') userId: number|null) {
        const servicePayload = { headers, userId };
        return this.organisationService.all(servicePayload);
    }

    @ApiOperation({ summary: 'Create organisation'})
    @ApiResponse({ status: 200, type: Organisation})
    @Auth()
    @Post('/create')
    create(@Body() createDto: CreateOrganisationDto) {
        return this.organisationService.create(createDto)
    }

    @ApiOperation({ summary: 'Update organisation'})
    @ApiResponse({ status: 200, type: [Organisation]})
    @Auth()
    @Post('/:id/update')
    update(@Param('id') id: number, @Body() updateDto: UpdateOrganisationDto) {
        return this.organisationService.update(id, updateDto)
    }

    @ApiOperation({ summary: 'Create organisation'})
    @ApiResponse({ status: 200, type: [Organisation]})
    @Auth()
    @Delete('/:id/delete')
    delete(@Param('id') id: number) {
        return this.organisationService.delete(id)
    }
}
