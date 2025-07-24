// src/dashboard/dashboard.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async getDashboardData(): Promise<{ user: { name: string }, rating: number }[]> {
    const users = await this.userRepo.find();

    return users.map(user => ({
      user: { name: user.name },
      rating: user.rating || 0,
    }));
  }
}
