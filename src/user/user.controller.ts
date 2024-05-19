
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from '../types/response';
import { User } from '../types/user';
@Controller()
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}
    @Post()
    async addUser(@Body() body: User): Promise<Response>{
        return await this.userService.addUser(
            body.email
        );
    }
    @Put()
    async updateUser(@Body() body: User): Promise<Response>{
        return await this.userService.updateUser(
            body.id,
            body.email,
            body.password
        );
    }
    @Get()
    getUser(): Response{
        return {
            code: 200,
            message: "ok",
            success: true,
            data: {}
        }
    }
}
