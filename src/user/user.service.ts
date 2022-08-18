import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
    ){}

    async getMe(user: User) {
        const selectedUser = this.prisma.user.findUnique({
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
        const profileImage = this.prisma.profileImage.upsert({
            where: {
                userId: user.id
            },
            create: {
                imageName: image.originalname,
                url: image.path,
                userId: user.id
            },
            update: {
                imageName: image.originalname,
                url: image.path,
            },
            select: {
                imageName: true
            }
        })
        return profileImage;
    }

    async getAllMedia() {
        return this.prisma.profileImage.findMany();
    }

    async getAllUser() {
        return this.prisma.user.findMany();
    }
}
