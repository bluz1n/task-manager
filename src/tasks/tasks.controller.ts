import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDTO } from './dto/create-task-dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTasksById(@Param('id') id: string): Task {
    return this.tasksService.getTasksById(id);
  }

  // TO-DO
  // @Get('/:status')
  // getTasksByStatus(@Param('status') status: string): Task {
  //   return this.tasksService.getTasksByStatus(status);
  // }

  @Post()
  createTask(@Body() CreateTaskDTO): CreateTaskDTO {
    return this.tasksService.createTask(CreateTaskDTO);
  }

}
