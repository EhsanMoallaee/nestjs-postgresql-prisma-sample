import { Global, Module } from '@nestjs/common';
import { CustomGlobalLoggerService } from './custom-global-logger.service';

@Global()
@Module({
  providers: [CustomGlobalLoggerService],
  exports: [CustomGlobalLoggerService],
})
export class CustomGlobalLoggerModule {}
