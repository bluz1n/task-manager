import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task-dto';
import { TaskStatus } from './task-status.enum';

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

  async createTask(createTaskDTO: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDTO;
    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN
    });
    try {
      return await this.tasksRepository.save(task);
    } catch (error) {
      throw new BadRequestException();
    }
  }

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

  // deleteTask(id: string): void {
  //   const found = this.getTasksById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  // }
}
