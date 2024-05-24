import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { PrismaService } from '../infrastructure/database/database.service';
import { Prisma, Task } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';

describe('TaskService', () => {
  let taskService: TaskService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: PrismaService,
          useValue: {
            task: {
              create: jest.fn(),
              findFirstOrThrow: jest.fn(),
              findMany: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
              deleteMany: jest.fn(),
            },
            user: {
              findUniqueOrThrow: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    taskService = module.get<TaskService>(TaskService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('addTask', () => {
    it('should add a task', async () => {
      const task: Task = {
        id: 1,
        name: 'Test Task',
        userId: '1',
        priority: 1,
        content: '',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prismaService.task, 'create').mockResolvedValue(task);

      const result = await taskService.addTask(task.name, task.userId, task.priority);

      expect(result).toEqual(task);
    });
  });

  describe('getTaskByName', () => {
    it('should return a task by name', async () => {
      const task: Task = {
        id: 1,
        name: 'Test Task',
        userId: '1',
        priority: 1,
        content: '',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prismaService.task, 'findFirstOrThrow').mockResolvedValue(task);

      const result = await taskService.getTaskByName('Test Task');

      expect(result).toEqual(task);
    });
  });

  describe('getUserTasks', () => {
    it('should return tasks for a user', async () => {
      const tasks: Task[] = [
        {
          id: 1,
          name: 'Test Task 1',
          userId: '1',
          priority: 1,
          content: '',
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Test Task 2',
          userId: '1',
          priority: 2,
          content: '',
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(prismaService.task, 'findMany').mockResolvedValue(tasks);

      const result = await taskService.getUserTasks('1');

      expect(result).toEqual(tasks);
    });
  });

  describe('updateTask', () => {
    it('should update a task', async () => {
      const task: Task = {
        id: 1,
        name: 'Updated Task',
        userId: '1',
        priority: 1,
        content: '',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prismaService.task, 'update').mockResolvedValue(task);

      const result = await taskService.updateTask(1, { name: 'Updated Task' });

      expect(result).toEqual(task);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      const task: Task = {
        id: 1,
        name: 'Test Task',
        userId: '1',
        priority: 1,
        content: '',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prismaService.task, 'delete').mockResolvedValue(task);

      const result = await taskService.deleteTask(1);

      expect(result).toEqual(task);
    });
  });
});
