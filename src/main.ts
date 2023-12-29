import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // dto에서 @IsString 같은 기능을 제공하는 ValidationPipe
  app.useGlobalPipes(new ValidationPipe)
  await app.listen(9000);
}
bootstrap();
