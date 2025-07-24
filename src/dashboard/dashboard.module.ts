import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/user/user.entity';
import { RatingService } from './rating/rating.service';

@Module({
  imports: [TypeOrmModule.forFeature([ User])],
  controllers: [DashboardController],
  providers: [DashboardService, RatingService],
})
export class DashboardModule {}
