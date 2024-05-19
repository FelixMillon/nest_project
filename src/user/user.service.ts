import { Injectable , NotImplementedException } from '@nestjs/common';
import { PrismaService  } from 'src/infrastructure/database/database.service'
import { Response } from '../types/response'
import { Prisma } from '@prisma/client'

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async addUser(name:string, email: string, password: string): Promise<Response> {
        try {
            const insertedUser = await this.prisma.user.create({
                data:{
                    name,
                    email,
                    password
                }
            });
            return {
                code: 201,
                success: true,
                message: "user created with success",
                data: insertedUser
            }
            } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    return {
                        code: 400,
                        success: false,
                        message: "user already exists",
                        data: {}
                    }
                }
                return {
                    code: 400,
                    success: false,
                    message: "error while creating new user",
                    data: e
                }
            }
        }
    }

    async updateUser(id: number, name:string | null, email: string | null): Promise<Response> {
        try {
            let updateData: { [key: string]: string } = {};
            if(typeof name === 'string'){
                updateData.name = name
            }
            if(typeof email === 'string'){
                updateData.email = email
            }
            if( Object.keys(updateData).length == 0){
                return {
                    code: 200,
                    success: true,
                    message: "No data found",
                    data: {}
                }
            }
            const updatedUser = await this.prisma.user.update({
                where: {
                    id: id
                },
                data: updateData
            });
            return {
                code: 200,
                success: true,
                message: "user updated with success",
                data: updatedUser
            }
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    return {
                        code: 400,
                        success: false,
                        message: "user does not exists",
                        data: {}
                    }
                }
                return {
                    code: 500,
                    success: false,
                    message: "error while updating new user",
                    data: e
                }
            }
        }
    }

    async deleteUser(id: number): Promise<Response> {
        try {
            const deletedUser = await this.prisma.user.delete({
                where: {
                    id: id
                }
            });
            return {
                code: 200,
                success: true,
                message: "user delete with success",
                data: deletedUser
            }
            } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                return {
                    code: 500,
                    success: false,
                    message: "error while updating new user",
                    data: e
                }
            }
        }
    }

    getUser(email: string): Promise<unknown> {
        throw new NotImplementedException();
    }

    resetData(): Promise<void> {
        throw new NotImplementedException();
    }
}
