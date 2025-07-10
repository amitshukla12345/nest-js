// src/register/register.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Register } from './register.entity';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';

@Module({
  imports: [TypeOrmModule.forFeature([Register])],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
