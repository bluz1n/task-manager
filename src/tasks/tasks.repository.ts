import { EntityRepository } from '@mikro-orm/postgresql';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task-dto';
import { TaskStatus } from './task-status.enum';
import { BadRequestException } from '@nestjs/common';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { User } from 'src/auth/user.entity';

export class TasksRepository extends EntityRepository<Task> {
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });
    try {
      await this.em.persistAndFlush(task);
      return task;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const qb = this.createQueryBuilder('task');
    if (status) {
      qb.andWhere({ status });
    }
    if (search) {
      qb.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
      );
    }
    const tasks = await qb.getResult();
    return tasks;
  }
}
