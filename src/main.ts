import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // ✅ Imported for global validation

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Global validation for DTOs (uses class-validator)
  app.useGlobalPipes(new ValidationPipe());

  // ✅ Enable CORS for Angular frontend at localhost:4200
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
