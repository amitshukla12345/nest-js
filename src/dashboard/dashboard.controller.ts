import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';

@Controller('dashboard')
export class DashboardController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Get('dashboard-data')
  async getDashboardData() {
    const users = await this.userRepository.find();

    return users.map(user => ({
      user: { name: user.name },
      rating: user.rating || 0
    }));
  }
}
