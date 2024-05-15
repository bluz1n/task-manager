import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { SqlEntityManager } from '@mikro-orm/postgresql';
import { TaskStatus } from './task-status.enum';
import { BadRequestException } from '@nestjs/common';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn()
});

const mockSqlEntityManager = () => ({});

const mockUser = {
  username: 'John',
  id: 'someId',
  password: 'somePassword',
  tasks: [],
}

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository: ReturnType<typeof mockTasksRepository>;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
        { provide: SqlEntityManager, useFactory: mockSqlEntityManager },

      ],
    }).compile();
    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and return the result', async () => {
      tasksRepository.getTasks.mockResolvedValue('someValue');
      const result = await tasksService.getTasks(null, mockUser)
      expect(result).toEqual('someValue')
    });
  });

  describe('getTaskById', () => {
    it('calls TasksRepository.findOne and return the result', async () => {
      const mockTask = {
        title: 'Test title',
        description: 'Test description',
        id: 'someId',
        status: TaskStatus.OPEN,
      };
      tasksRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById('someId', mockUser);
      expect(result).toEqual(mockTask);
    });

    it('calls TasksRepository.findOne and handles an error', async () => {
      tasksRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById('someId', mockUser)).rejects.toThrow(BadRequestException);
    });
  });

});
