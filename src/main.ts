import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Fix: allow origin from Angular (4200)
  app.enableCors({
    origin: 'http://localhost:4200', // ✅ must match Angular port
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  });

  await app.listen(3000);
}
bootstrap();
