// src/rating/rating.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  //  Get all users and their ratings for dashboard
  async getDashboardData() {
    const users = await this.userRepository.find();
    return users.map(user => ({
      user: { name: user.name },
      rating: user.rating || 0
    }));
  }
}
