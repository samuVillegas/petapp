import {
  Injectable,
  HttpException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from '../entities/role.entity';
import { CreateRoleDto } from '../dtos/role.dto';


@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private roleRepo: Repository<Role>) {}

  findAll() {
    return this.roleRepo.find();
  }

  async create(data: CreateRoleDto) {
    const { name } = data;
    const role = await this.roleRepo.findOneBy({ name: name });
    if (role) 
      throw new HttpException('Unique restriction violated', 484);
    const newRole = this.roleRepo.create(data);
    return this.roleRepo.save(newRole);
  }

  async remove(name: string) {
    const role = await this.roleRepo.findOneBy({ name: name });
    if (!role) 
      throw new HttpException('Id Not found', 432);
    return this.roleRepo.delete(name);
  }
}
