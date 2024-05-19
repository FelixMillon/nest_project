import { Controller, Get, Post, Put, Delete, Param, Body, BadRequestException, Res  } from '@nestjs/common';
import { Response } from 'express';
import { TaskService } from './task.service';
import { FormatResponse } from '../types/response';
import { Task } from '../types/task';

@Controller()
export class TaskController {
    constructor() {}

    addTask(@Body() body: Task, @Res() res: Response): Promise<Response> {
        const {name, userId, priority} = body
        if (!this.isInteger(priority)) {
            return res.status(400).json({
                code: 400,
                success: false,
                message: "Invalid email format",
                data: null
            });
        }
        const userAdded = await this.userService.addUser(
            email
        );
        return res.status(userAdded.code).json({
            userAdded
        });
    }

    getTaskByName(@Body() body: User, @Res() res: Response): Promise<Response> {
        throw new NotImplementedException();
    }

    getUserTasks(userId: string): Promise<unknown[]> {
        throw new NotImplementedException();
    }

    private isInteger(priority: number){
        return priority % 1 === 0;
    }
    private isValidPriority(priority: number){
        return priority > 0
    }
    private isNotEmptyString(name: string){
        return name != ''
    }
    private verifyNameSpaceToEnds(name: string){
        if(name.charAt(0) === ' ' || name.charAt(name.length - 1)){
            return false
        }
        return true
    }
}
