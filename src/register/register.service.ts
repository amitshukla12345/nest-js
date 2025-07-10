// src/register/register.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Register } from './register.entity';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(Register)
    private registerRepo: Repository<Register>,
  ) {}

  create(userData: Partial<Register>) {
    const user = this.registerRepo.create(userData);
    return this.registerRepo.save(user);
  }

  findAll() {
    return this.registerRepo.find();
  }

  findByEmail(email: string) {
    return this.registerRepo.findOne({ where: { email } });
  }
}
