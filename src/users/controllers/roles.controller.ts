import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { RolesService } from '../services/roles.service';
import { CreateRoleDto } from '../dtos/role.dto';
import { Role } from '../entities/role.entity';
import { Public } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { RoleModel } from '../../auth/models/roles.model';
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Public()
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Role,
    isArray: true,
    description: 'Roles obtained successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Roles(RoleModel.ADMIN)
  @ApiOperation({ summary: 'Create a role' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Role,
    description: 'Role created successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: 484,
    description: 'Role already exists',
  })
  @Post()
  create(@Body() payload: CreateRoleDto) {
    return this.rolesService.create(payload);
  }

  @Roles(RoleModel.ADMIN)
  @ApiOperation({ summary: 'Delete a role' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Role deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: 432,
    description: 'Role not found',
  })
  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.rolesService.remove(name);
  }
}
