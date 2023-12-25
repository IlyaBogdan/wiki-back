import { Injectable } from '@nestjs/common';
import { Role } from './roles.model';
import { repos } from 'consts/consts';
import { UserRoles } from './user-roles.model';

export const RolesProvider = [
    {
        provide: repos.roles,
        useValue: UserRoles
    }
]
