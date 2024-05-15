import {
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { UsersRepository } from './users.repository';
import { Task } from 'src/tasks/task.entity';

@Entity({ repository: () => UsersRepository })
export class User {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @Property()
  @Unique()
  username: string;

  @Property()
  password: string;

  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  task: Task[];
}
