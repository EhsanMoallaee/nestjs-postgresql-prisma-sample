import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { LoginDto, RegisterDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
    ){}

    async register(dto: RegisterDto) {
        try {
            const password = await argon.hash(dto.password);
            const user = await this.prisma.user.create({
                data: {
                    fullname: dto.fullname,
                    balance: dto.balance,
                    email: dto.email,
                    password,
                },
                select: {
                    id: true,
                    email: true,
                    createdAt: true,
                    balance: true,
                    fullname: true,
                }
            });

            return this.signToken(user.id, user.email);
        } catch (error) {
            if( error instanceof PrismaClientKnownRequestError) {
                if(error.code === 'P2002') {
                    throw new ForbiddenException('ایمیل وارد شده تکراری است و قبلا ثبت شده است')
                }
            }
            throw error;
        }
        
    }

    async login(dto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        })
        if(!user) throw new ForbiddenException('مشخصات وارد شده صحیح نمیباشد');
        const pwMatch = await argon.verify(user.password, dto.password);
        if(!pwMatch) throw new ForbiddenException('مشخصات وارد شده صحیح نمیباشد');
        
        return this.signToken(user.id, user.email);
    }

    async signToken(userId: number, email: string): Promise<{access_token: string}> {
        const payload = {
            sub: userId,
            email
        }
        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret
        })
        return {
            access_token: token,
        }
    }
}
