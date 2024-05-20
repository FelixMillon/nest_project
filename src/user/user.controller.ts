
import { Controller, Get, Post, Put, Delete, Param, Body, BadRequestException, Res  } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { FormatResponse } from '../types/response';
import { User } from '../types/user';
@Controller()
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}
    @Post()
    async addUser(@Body() body: User, @Res() res: Response): Promise<Response>{
        const email = body.email
        if (!this.isValidEmail(email)) {
            return res.status(400).json({
                code: 400,
                success: false,
                message: "Invalid email format"
            });
        }
        const userAdded = await this.userService.addUser(
            email
        );
        return res.status(201).json(userAdded);
    }
    @Put()
    async updateUser(@Body() body: User, @Res() res: Response): Promise<Response>{
        const userUpdated = await this.userService.updateUser(
            body.email,
            body.password
        );
        return res.status(200).json(userUpdated);
    }
    @Get(':userId')
    async getUser(@Param('userId') userId: string, @Res() res: Response): Promise<Response>{

        const userGetted = await this.userService.getUser(
            userId
        );
        return res.status(200).json(userGetted);
    }

    private isValidEmail(email) {
        const regex = /^(?:[a-zA-Z0-9_'^&/+-])+(?:\.[a-zA-Z0-9_'^&/+-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
        return regex.test(email);
      }
    
}

