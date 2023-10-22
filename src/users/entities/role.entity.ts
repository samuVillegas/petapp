import {
  PrimaryColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiHideProperty } from '@nestjs/swagger';
import { User } from './user.entity';


@Entity('roles')
export class Role {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  name: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ApiHideProperty()
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
