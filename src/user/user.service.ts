import { Injectable , NotImplementedException } from '@nestjs/common';
import { PrismaService  } from '../infrastructure/database/database.service'
import { UserResponse } from '../types/response'
import { Prisma } from '@prisma/client'

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async addUser(email: string): Promise<UserResponse> {
        try {
            const insertedUser = await this.prisma.user.create({
                data:{
                    email
                },
                include: {
                  tasks: true
                }
            });
            return {
                code: 201,
                success: true,
                message: "user created with success",
                email: insertedUser.email,
                data: insertedUser
            }
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    return {
                        code: 409,
                        success: false,
                        message: "user already exists",
                        email: null,
                        data: {}
                    }
                }
                return {
                    code: 400,
                    success: false,
                    message: "error while creating new user",
                    email: null,
                    data: error
                }
            }
        }
    }

    async updateUser(id: number, name:string | null, email: string | null): Promise<UserResponse> {
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
                    email: null,
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
                email: updatedUser.email,
                data: updatedUser
            }
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    return {
                        code: 400,
                        success: false,
                        message: "user does not exists",
                        email: null,
                        data: {}
                    }
                }
                return {
                    code: 500,
                    success: false,
                    message: "error while updating new user",
                    email: null,
                    data: error
                }
            }
        }
    }

    async deleteUser(id: number): Promise<UserResponse> {
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
                email: null,
                data: deletedUser
            }
            } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return {
                    code: 500,
                    success: false,
                    message: "error while updating new user",
                    email: null,
                    data: error
                }
            }
        }
    }

    async getUser(email: string): Promise<UserResponse> {
        try {
            const insertedUser = await this.prisma.user.findFirstOrThrow({
                where:{
                    email
                }
            });
            return {
                code: 200,
                success: true,
                message: "user finded with success",
                email: insertedUser.email,
                data: insertedUser
            }
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    return {
                        code: 400,
                        success: false,
                        message: "user doesn't exists",
                        email: null,
                        data: {}
                    }
                }
                return {
                    code: 400,
                    success: false,
                    message: "error while getting user",
                    email: null,
                    data: error
                }
            }
        }
    }

    async resetData(): Promise<void> {
        try {
            const insertedUser = await this.prisma.user.deleteMany({});
        } catch (error) {
            console.error("Une erreur s'est produite lors de la suppression des données :", error);
        }
    }
}
