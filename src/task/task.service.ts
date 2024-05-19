import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaService  } from '../infrastructure/database/database.service'
import { FormatResponse } from '../types/response'
import { Prisma } from '@prisma/client'

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) {}

    addTask(name: string, userId: string, priority: number): Promise<void> {
        throw new NotImplementedException();
    }

    getTaskByName(name: string): Promise<unknown> {
        throw new NotImplementedException();
    }

    getUserTasks(userId: string): Promise<unknown[]> {
        throw new NotImplementedException();
    }

    async resetData(): Promise<void> {
        try {
            const insertedUser = await this.prisma.task.deleteMany({});
        } catch (error) {
            console.error("Une erreur s'est produite lors de la suppression des données :", error);
        }
    }
}
