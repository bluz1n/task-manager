import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

  @Get(':id')
  getTasksById(@Param('id') id: string): Task {
    return this.tasksService.getTasksById(id);
  }

  @Post()
  createTask(@Body() CreateTaskDTO): CreateTaskDTO {
    return this.tasksService.createTask(CreateTaskDTO);
  }

  @Delete(':id') 
  deleteTask(@Param('id') id: string): void {
    return this.tasksService.deleteTask(id);
  }

}
