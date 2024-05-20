import { Injectable , ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService  } from '../infrastructure/database/database.service'
import { User } from '../types/user'
import { Prisma } from '@prisma/client'

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async addUser(email: string): Promise<User> {
        try {
            const insertedUser = await this.prisma.user.create({
                data:{
                    id: email,
                    email: email
                },
                include: {
                  tasks: true
                }
            });
            return insertedUser
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException("user already exists");
                }
                throw new ConflictException(`error while creating new user: ${error}`);
            }
        }
    }

    async updateUser(name:string | null, email: string | null): Promise<User> {
        try {
            let updateData: { [key: string]: string } = {};
            if(typeof name === 'string'){
                updateData.name = name
            }
            if(typeof email === 'string'){
                updateData.email = email
            }
            if( Object.keys(updateData).length == 0){
                throw new BadRequestException(`No data found`)
            }
            const updatedUser = await this.prisma.user.update({
                where: {
                    email: email
                },
                data: updateData
            });
            return updatedUser
            
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new BadRequestException(`User does not exists`)
                }
                throw new BadRequestException(`error while updating new user : ${error}`)
            }
        }
    }

    async deleteUser(email: string): Promise<boolean> {
        try {
            const deletedUser = await this.prisma.user.delete({
                where: {
                    email: email
                }
            });
            return true
            } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new BadRequestException(`error while deleting user : ${error}`)
            }
        }
    }

    async getUser(userId: string): Promise<User> {
        try {
            const insertedUser = await this.prisma.user.findFirstOrThrow({
                where:{
                    id: userId
                }
            });
            return insertedUser
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new BadRequestException(`user doesn't exists`)
                }
                throw new BadRequestException(`error while getting user : ${error}`)
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
