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

@Injectable()
export class TasksService {
  constructor(
    private tasksRepository: TasksRepository,
    private em: EntityManager,
  ) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async getTaskById(id: string): Promise<Task> {
    try {
      const task = await this.tasksRepository.findOne(id);
      if (!task) {
        throw new NotFoundException();
      }
      return task;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.em.persistAndFlush(task);
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.nativeDelete(id);
    if (result === 0) {
      throw new NotFoundException();
    }
  }
}
