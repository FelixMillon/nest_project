import { Controller, Get, Post, Put, Delete, Param, Body, BadRequestException, Res  } from '@nestjs/common';
import { Response } from 'express';
import { TaskService } from './task.service';
import { TaskResponse } from '../types/response';
import { FormatResponse } from '../types/response';
import { Task } from '../types/task';

@Controller()
export class TaskController {
    constructor(
        private readonly taskService: TaskService
    ) {}
    @Post()
    async addTask(@Body() body: Task, @Res() res: Response): Promise<Response> {
        let {name, userId, priority} = body
        
        const testUserId = this.isAValidString(userId, "userId")
        if( testUserId != null){
            return res.status(testUserId.code).json(testUserId);
        }
    
        const testName = this.isAValidString(name, "name")
        if( testName != null){
            return res.status(testName.code).json(testName);
        }


        const testPriority = this.isANaturalInteger(priority, "priority")
        if( testPriority != null){
            return res.status(testPriority.code).json(testPriority);
        }
        priority = Number(priority)

        const taskAdded = await this.taskService.addTask(
            name,
            userId,
            priority
        );
        return res.status(201).json(taskAdded);
    }
    @Get(':name')
    async getTaskByName(@Param('name') name: string,  @Res() res: Response): Promise<Response> {
        const testName = this.isAValidString(name, "name")
        if( testName != null){
            return res.status(testName.code).json(testName);
        }
        const taskFinded = await this.taskService.getTaskByName(
            name
        );
        return res.status(200).json(taskFinded);
    }

    @Get('/user/:userId')
    async getUserTasks(@Param('userId') userId: string,  @Res() res: Response): Promise<Response> {
        const testName = this.isAValidString(userId, "userId")
        if( testName != null){
            return res.status(testName.code).json(testName);
        }
        const tasksFinded = await this.taskService.getUserTasks(
            userId
        );
        return res.status(200).json(tasksFinded);
    }

    private isInteger(myNumber: number){
        return myNumber % 1 === 0;
    }

    private isSuperiorToZero(myNumber: number){
        return myNumber > 0;
    }

    private isNotEmptyString(myString: string){
        return myString != '';
    }

    private verifySpacesToEnds(myString: string){
        if(myString != myString.trim()){
            return false;
        }
        return true;
    }

    private isParsableAsNumber(myString) {
        if (typeof myString !== 'string') {
            return false;
        }
      
        if (myString.length === 0) {
            return false;
        }
        try{
            const num = Number(myString);
            return !isNaN(num);
        }
        catch{
            return false;
        }
    }

    
    private isAValidString(myString, keyName): FormatResponse | null {
        if( ! this.isNotEmptyString(myString) ){
            return {
                code: 400,
                success: false,
                message: `${keyName} is empty`,
                data: null
            };
        }
        if ( ! this.verifySpacesToEnds(myString) ) {
            return {
                code: 400,
                success: false,
                message: `${keyName} is white spaced at the ends`,
                data: null
            };
        }
        return null
    }

    private isANaturalInteger(myString, keyName): FormatResponse | null {
        if( ! this.isParsableAsNumber(myString) ){
            return {
                code: 400,
                success: false,
                message: `${keyName} must be parsable as a number`,
                data: null
            };
        }
        const myNumber = Number(myString)
        if ( ! this.isInteger(myNumber) ) {
            return {
                code: 400,
                success: false,
                message: `${keyName} must be an integer`,
                data: null
            };
        }
        if ( ! this.isSuperiorToZero(myNumber) ) {
            return {
                code: 400,
                success: false,
                message: `${keyName} must be superior to zero`,
                data: null
            };
        }
        return null
    }
}
