import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../infrastructure/database/database.service';
import { Task } from '../types/task';
import { Prisma } from '@prisma/client';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) {}

    async addTask(name: string, userId: string, priority: number): Promise<Task> {
        try {
            const insertedTask = await this.prisma.task.create({
                data: {
                    name,
                    priority,
                    userId
                }
            });
            return insertedTask;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2003') {
                    throw new BadRequestException("User doesn't exist");
                }
                throw new BadRequestException(`Error while creating new task: ${error}`);
            }
        }
    }

    async getTaskByName(name: string): Promise<Task> {
        try {
            const gettedTask = await this.prisma.task.findFirstOrThrow({
                where: {
                    name
                }
            });
            return gettedTask;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new BadRequestException("Task doesn't exist");
                }
                throw new BadRequestException("Error while getting task by name");
            }
        }
    }

    async getUserTasks(userId: string): Promise<Task[]> {
        try {
            await this.prisma.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new BadRequestException(`User doesn't exist`);
                }
                throw new BadRequestException(`Error while getting tasks by userId: ${error}`);
            }
        }

        try {
            const gettedTask = await this.prisma.task.findMany({
                where: {
                    userId: userId
                }
            });
            return gettedTask;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new BadRequestException("Tasks don't exist");
                }
                throw new BadRequestException(`Error while getting tasks by userId: ${error}`);
            }
        }
    }

    async updateTask(id: number, data: Partial<Task>): Promise<Task> {
        try {
            const updatedTask = await this.prisma.task.update({
                where: { id },
                data,
            });
            return updatedTask;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new BadRequestException("Task doesn't exist");
            }
            throw new BadRequestException(`Error while updating task: ${error.message}`);
        }
    }

    async deleteTask(id: number): Promise<Task> {
        try {
            const deletedTask = await this.prisma.task.delete({
                where: { id },
            });
            return deletedTask;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new BadRequestException("Task doesn't exist");
            }
            throw new BadRequestException(`Error while deleting task: ${error.message}`);
        }
    }


    async resetData(): Promise<void> {
        try {
            await this.prisma.task.deleteMany({});
        } catch (error) {
            console.error("An error occurred while deleting data:", error);
        }
    }
}
