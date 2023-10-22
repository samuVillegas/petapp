import {
  PrimaryColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

import { Role } from './role.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  email: string;

  @ApiHideProperty()
  @Exclude()
  @Column({ type: 'varchar', length: 50 })
  password: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Exclude()
  @ApiHideProperty()
  @Column({ name: 'last_connection', type: 'timestamptz', nullable: true })
  lastConnection: Date;

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
  @Exclude()
  @ManyToOne(() => Role, (role) => role.users, { nullable: false })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ApiProperty({ name: 'roleName ', type: String })
  @Expose()
  get roleName() {
    if (this.role) {
      return this.role.name;
    }
    return null;
  }
}
