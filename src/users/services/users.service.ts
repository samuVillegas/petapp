import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './../dtos/users.dto';

import { Role } from '../entities/role.entity';


@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>, @InjectRepository(Role) private roleRepo: Repository<Role>) {}

  findAll() {
    return this.userRepo.find({ relations: ['role'] });
  }

  async findOne(email: string) {
    const user = await this.userRepo.findOne({
      where: { email },
      relations: ['role']
    });
    if (!user) {
      throw new HttpException('Id not found', 432);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    const { roleName, email } = data;
    if(roleName){
      const role = await this.roleRepo.findOneBy({ name: roleName });
      if(!role)
        throw new HttpException('Id not found', 432)
      newUser.role = role;
    }
    if(email){
      const user = await this.userRepo.findOneBy({ email });
      if(user)
        throw new HttpException('Unique restriction violated', 484);
    }
    return this.userRepo.save(newUser);
  }

  async update(email: string, changes: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ email });
    if (!user)
      throw new HttpException('Id not found', 432);
    this.userRepo.merge(user, changes);
    await this.userRepo.save(user);
    return this.findOne(email);
  }

  findByEmail(email: string){
    return this.userRepo.findOne({
      where: { email },
      relations: ['role']
    });
  }
}
