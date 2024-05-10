import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task-dto';
import { TasksRepository } from './tasks.repository';
import { EntityManager } from '@mikro-orm/core';

@Injectable()
export class TasksService {
  constructor(
    private tasksRepository: TasksRepository,
    private em: EntityManager
  ){}

  async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  deleteTask(id: string): Promise<void> {
    return this.tasksRepository.deleteTask(id);
  }
    
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }


  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
  //   }
  //   return tasks;
  // }


  // updateTaskStatus(id: string, status: TaskStatus) {
  //   const task = this.getTasksById(id);
  //   task.status = status;
  //   return task;
  // }

 
}
