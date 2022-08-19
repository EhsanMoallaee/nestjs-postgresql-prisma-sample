import { createReadStream } from 'fs';
import { Controller, Get, Param, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors, StreamableFile, ParseIntPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';

import { User } from '@prisma/client';

import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import {storage} from './image-storage/index';
import { UserService } from './user.service';

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

    @Get('profileImage/:imagename') // for own test
    getProfileImage(@Param('imagename') imagename, @Res() res) {
        const file = createReadStream(join(process.cwd(), 'uploads/profileimages/' + imagename));
        file.pipe(res);
        // return of(res.sendFile(join(process.cwd(), 'uploads/profileimages/' + imagename)))
        // return new StreamableFile(file);
    }

    @Get('user/:userId')
    getUserById(@Param('userId', ParseIntPipe) userId: number) {
        return this.userService.getUserById(userId)
    }

    @Get('medias') // for own test
    getAllMedia() {
        return this.userService.getAllMedia()
    }

    @Get('allusers') // for own test
    getAllUser() {
        return this.userService.getAllUser()
    }
}
