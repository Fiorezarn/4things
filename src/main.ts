import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    credentials: true,
  });
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
