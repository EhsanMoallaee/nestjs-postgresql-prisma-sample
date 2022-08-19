import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { CustomGlobalLoggerModule } from './custom-global-logger/custom-global-logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    CustomGlobalLoggerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
