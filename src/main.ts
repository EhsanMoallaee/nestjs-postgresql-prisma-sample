import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe( {whitelist: true } ));
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 4000;
  await app.listen(port);
  Logger.log(` 🚀  Server running on http://localhost:${port}`, 'Bootstrap-HTTPServer');
}
bootstrap();
