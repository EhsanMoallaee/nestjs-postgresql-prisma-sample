import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';

import { CustomGlobalLoggerService } from './../custom-global-logger/custom-global-logger.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private loggerService: CustomGlobalLoggerService
    ){}

    async getMe(user: User) {
        this.loggerService.log({year: 2022});

        const selectedUser = await this.prisma.user.findUnique({
            where: {
                id: user.id
            },
            select: {
                fullname: true,
                email: true,
                balance: true,
                profileImage: {
                    select: {
                        imageName: true
                    }
                }
            },
        });

        return selectedUser;
    }
    async uploadProfileImage(image, user) {
        const profileImage = await this.prisma.profileImage.upsert({
            where: {
                userId: user.id
            },
            create: {
                imageName: image.filename,
                url: image.path,
                userId: user.id
            },
            update: {
                imageName: image.filename,
                url: image.path,
            },
            select: {
                imageName: true
            }
        })
        return profileImage;
    }

    async getUserById(userId: number) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                fullname: true,
                email: true,
                balance: true,
                profileImage: true
            }
        });
        if(!user) throw new NotFoundException();
        return user;
    }

    async getAllMedia() {
        return await this.prisma.profileImage.findMany();
    }

    async getAllUser() {
        return await this.prisma.user.findMany();
    }
}
