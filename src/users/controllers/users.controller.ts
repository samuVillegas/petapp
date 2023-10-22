import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { UsersService } from './../services/users.service';
import { User } from './../entities/user.entity';


@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Users obtained successfully',
    type: User,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  get() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get user by email' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User obtained successfully',
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: 432,
    description: 'email not found',
  })
  @Get(':email')
  getOne(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created successfully',
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: 432,
    description: 'roleName not exist',
  })
  @ApiResponse({
    status: 484,
    description: 'Email already exists',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Put(':email')
  @ApiOperation({ summary: 'Update user by email' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User edited successfully',
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: 432,
    description: 'email not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  update(@Param('email') email: string, @Body() payload: UpdateUserDto) {
    return this.usersService.update(email, payload);
  }
}
