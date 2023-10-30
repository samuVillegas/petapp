import { SetMetadata } from '@nestjs/common';

import { RoleModel } from '../models/roles.model';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: RoleModel[]) => SetMetadata(ROLES_KEY, roles);