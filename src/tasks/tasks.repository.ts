import { EntityRepository } from '@mikro-orm/postgresql';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task-dto';
import { TaskStatus } from './task-status.enum';
import { BadRequestException } from '@nestjs/common';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { User } from '../auth/user.entity';

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

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const qb = this.createQueryBuilder('task');
    qb.where({ user });
    if (status) {
      qb.andWhere({ status });
    }
    if (search) {
      qb.andWhere({
        $or: [
          { title: { $ilike: `%${search}%` } },
          { description: { $ilike: `%${search}%` } },
        ],
      });
    }
    const tasks = await qb.getResult();
    return tasks;
  }
}
