import { UserService } from './user.service';
import { Controller, Get, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { of } from 'rxjs';

import { User } from '@prisma/client';

import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import {storage} from './image-storage/index';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService){}

    @Get('me')
    getMe(@GetUser() user: User) {
        return this.userService.getMe(user);
    }

    @Put('upload')
    @UseInterceptors(FileInterceptor('file', storage))
    uploadProfileImage(@UploadedFile() file, @Req() req) {
        return this.userService.uploadProfileImage(file, req.user);
    }

    @Get('medias') // for own test
    getAllMedia() {
        return this.userService.getAllMedia()
    }

    @Get() // for own test
    getAllUser() {
        return this.userService.getAllUser()
    }
}
