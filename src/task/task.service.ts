import { Injectable , ConflictException, BadRequestException  } from '@nestjs/common';
import { PrismaService  } from '../infrastructure/database/database.service'
import { Task } from '../types/task'
import { Prisma } from '@prisma/client'

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
            return insertedTask
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException("Task already exists");
                }
                if (error.code === 'P2003') {
                    throw new BadRequestException("User doesn't exists");
                }
                throw new BadRequestException(`error while creating new task: ${error}`);
            }
        }
    }

    async getTaskByName(name: string): Promise<Task> {
        try {
            const gettedTask = await this.prisma.task.findFirstOrThrow({
                where:{
                    name
                }
            });
            return gettedTask
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new BadRequestException("task doesn't exists")
                }
                throw new BadRequestException("error while getting task by name")
            }
        }
    }

    async getUserTasks(userId: string): Promise<Task[]> {

        try {
            const userExists = await this.prisma.user.findUniqueOrThrow({
                where:{
                    id: userId
                }
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new BadRequestException(`user doesn't exists`)
                }
                throw new BadRequestException(`error while getting task by name : ${error}`)
            }
        }

        try {
            const gettedTask = await this.prisma.task.findMany({
                where:{
                    userId: userId
                }
            });
            return gettedTask
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new BadRequestException("task doesn't exists")
                }
                throw new BadRequestException(`error while getting task by name : ${error}`)
            }
        }
    }

    async resetData(): Promise<void> {
        try {
            const insertedUser = await this.prisma.task.deleteMany({});
        } catch (error) {
            console.error("Une erreur s'est produite lors de la suppression des données :", error);
        }
    }
}
