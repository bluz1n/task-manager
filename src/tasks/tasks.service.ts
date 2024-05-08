import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ){}

  async getTaskById(id: string): Promise<Task> {
    try {
      return await this.tasksRepository.findOne({ where: { id } });
    } catch (error) {
      throw new NotFoundException()
    }
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

  // createTask(createTaskDTO: CreateTaskDto): Task {
  //   const { title, description } = createTaskDTO;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }

  // updateTaskStatus(id: string, status: TaskStatus) {
  //   const task = this.getTasksById(id);
  //   task.status = status;
  //   return task;
  // }

  // deleteTask(id: string): void {
  //   const found = this.getTasksById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  // }
}
