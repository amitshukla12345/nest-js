// src/register/register.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { RegisterService } from './register.service';
import { Register } from './register.entity';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async registerUser(@Body() userData: Partial<Register>): Promise<Register> {
    return this.registerService.create(userData);
  }

  @Get()
  async getAllUsers(): Promise<Register[]> {
    return this.registerService.findAll();
  }
}
