import { EntityRepository } from "@mikro-orm/postgresql";
import { Task } from "./entities/task.entity";
import { CreateTaskDto } from "./dto/create-task-dto";
import { TaskStatus } from "./task-status.enum";
import { BadRequestException, NotFoundException } from "@nestjs/common";

export class TasksRepository extends EntityRepository<Task> {
 
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN
    });
    try {
    await this.em.persistAndFlush(task);
    return task;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.nativeDelete(id);
    if (result === 0) {
      throw new NotFoundException();
    }
  }
  
}
