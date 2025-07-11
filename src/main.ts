import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

import * as cookieParser from 'cookie-parser';
// somewhere in your initialization file


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:3000',"http://localhost:3001", 'https://your-frontend-domain.com'], // 👈 whitelist frontend(s)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // if you're using cookies or auth headers
  });
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
