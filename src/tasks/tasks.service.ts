import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task-dto';
import { TasksRepository } from './tasks.repository';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    private tasksRepository: TasksRepository,
    private em: EntityManager,
  ) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    try {
      const result = await this.tasksRepository.findOne({ id, user });
      if (!result) {
        throw new NotFoundException();
      }
      return result;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.em.persistAndFlush(task);
    return task;
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.tasksRepository.nativeDelete({ id, user });
    if (result === 0) {
      throw new NotFoundException();
    }
  }
}
