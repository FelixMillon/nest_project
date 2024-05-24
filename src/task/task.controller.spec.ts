import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Response } from 'express';
import { Task } from '../types/task';
import { HttpStatus } from '@nestjs/common';

describe('TaskController', () => {
  let taskController: TaskController;
  let taskService: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: {
            addTask: jest.fn(),
            getTaskByName: jest.fn(),
            getUserTasks: jest.fn(),
            updateTask: jest.fn(),
            deleteTask: jest.fn(),
          },
        },
      ],
    }).compile();

    taskController = module.get<TaskController>(TaskController);
    taskService = module.get<TaskService>(TaskService);
  });

  describe('addTask', () => {
    it('should add a task', async () => {
      const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
      const dto = { name: 'Test Task', userId: '1', priority: '1' };
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

      jest.spyOn(taskService, 'addTask').mockResolvedValue(task);

      await taskController.addTask(dto, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CREATED);
      expect(mockResponse.json).toHaveBeenCalledWith(task);
    });
  });

  describe('getTaskByName', () => {
    it('should return a task by name', async () => {
      const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
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

      jest.spyOn(taskService, 'getTaskByName').mockResolvedValue(task);

      await taskController.getTaskByName('Test Task', mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(task);
    });

    it('should return BadRequest if name is invalid', async () => {
      const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      await taskController.getTaskByName('  ', mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    });
  });

  describe('getUserTasks', () => {
    it('should return tasks for a user', async () => {
      const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
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

      jest.spyOn(taskService, 'getUserTasks').mockResolvedValue(tasks);

      await taskController.getUserTasks('1', mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(tasks);
    });

    it('should return BadRequest if userId is invalid', async () => {
      const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      await taskController.getUserTasks('  ', mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    });
  });

  describe('updateTask', () => {
    it('should update a task', async () => {
      const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
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

      jest.spyOn(taskService, 'updateTask').mockResolvedValue(task);

      await taskController.updateTask('1', { name: 'Updated Task' }, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(task);
    });

    it('should return BadRequest if id is invalid', async () => {
      const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      await taskController.updateTask('invalid-id', { name: 'Updated Task' }, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
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

      jest.spyOn(taskService, 'deleteTask').mockResolvedValue(task);

      await taskController.deleteTask('1', mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(task);
    });

    it('should return BadRequest if id is invalid', async () => {
      const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      await taskController.deleteTask('invalid-id', mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    });
  });
});
