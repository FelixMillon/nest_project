import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { PrismaService  } from '../infrastructure/database/database.service'

@Module({
    controllers: [TaskController],
    providers: [TaskService,PrismaService],
    exports: [TaskService],
})
export class TaskModule {}
