import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Exclude } from 'class-transformer';
import { TaskStatus } from './task-status.enum';
import { TasksRepository } from './tasks.repository';
import { User } from '../auth/user.entity';

@Entity({ repository: () => TasksRepository })
export class Task {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @Property()
  title: string;

  @Property()
  description: string;

  @Property()
  status: TaskStatus;

  @ManyToOne(() => User, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
