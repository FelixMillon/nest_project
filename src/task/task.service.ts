import { Injectable, Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Task } from '../types/task';

@Injectable()
export class TaskService {
  constructor(
    @Inject('PrismaClient') private prisma: PrismaClient
  ) {}

    // Adds a task
  async addTask(title: string, userId: number, priority: number, content: string): Promise<Task> {
    if (!content) {
      throw new Error("The 'content' field is required.");
    }

    const newTask = await this.prisma.task.create({
      data: {
        title,
        users: {
          connect: { id: userId },
        },
        priority,
        completed: false,
        content,
        createdAt: new Date(),
      },
      include: {
        users: true,
      },
    });

    return {
      id: newTask.id,
      title: newTask.title,
      content: newTask.content,
      priority: newTask.priority,
      completed: newTask.completed,
      users: newTask.users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        tasks: [],
      })),
      createdAt: newTask.createdAt,
      updatedAt: newTask.updatedAt,
    };
  }

   // Retrieves a task by name
  async getTaskByName(title: string): Promise<Task | null> {
    const task = await this.prisma.task.findFirst({
      where: { title },
      include: {
        users: true,
      },
    });

    if (!task) {
      return null;
    }

    return {
      id: task.id,
      title: task.title,
      content: task.content,
      priority: task.priority,
      completed: task.completed,
      users: task.users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        tasks: [],
      })),
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }

  // Retrieves tasks associated with a user
  async getUserTasks(userId: number): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      where: {
        users: {
          some: { id: userId },
        },
      },
      include: {
        users: true,
      },
    });

    return tasks.map((task) => ({
      id: task.id,
      title: task.title,
      content: task.content,
      priority: task.priority,
      completed: task.completed,
      users: task.users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        tasks: [],
      })),
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    }));
  }

  // Resets tasks
  async resetData(): Promise<void> {
    await this.prisma.task.deleteMany({});
  }
}
