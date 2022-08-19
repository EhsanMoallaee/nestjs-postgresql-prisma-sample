import { ConfigModule } from '@nestjs/config';
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { CustomGlobalLoggerModule } from './custom-global-logger/custom-global-logger.module';
import { ArabicToPersianMiddleware } from './middleware/arabicToPersian.middleware';

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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ArabicToPersianMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
