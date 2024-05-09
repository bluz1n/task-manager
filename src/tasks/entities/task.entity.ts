import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { TaskStatus } from "../task-status.enum";
import { TasksRepository } from "../tasks.repository";

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

}