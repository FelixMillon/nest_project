import {
    Controller,
    Get,
    Post,
    Param,
    Body,
    BadRequestException,
    ParseIntPipe,
  } from '@nestjs/common';
  import { TaskService } from './task.service';
  
  @Controller('task')
  export class TaskController {
    constructor(private readonly taskService: TaskService) {}
  
    // Retrieves tasks associated with a user by ID
    @Get('/user/:userId')
    async getUserTasks(@Param('userId', ParseIntPipe) userId: number) {
      if (userId <= 0) { 
        throw new BadRequestException('Invalid user ID');
      }
  
      return await this.taskService.getUserTasks(userId);
    }
  
    // Creates a new task
    @Post('/')
    async createTask(
      @Body() body: { title: string; userId: number; priority: number; content: string }
    ) {
      const { title, userId, priority, content } = body;
      if (!title || !content) {
        throw new BadRequestException('Title and content are required');
      }
      if (priority < 0 || priority > 3) {
        throw new BadRequestException('Priority must be between 0 and 3');
      }
  
      return await this.taskService.addTask(title, userId, priority, content);
    }
  }
  