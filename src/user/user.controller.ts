import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
 import { UpdateRatingDto } from './dto/rating.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() userData: Partial<User>): Promise<User> {
    return this.userService.create(userData);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.userService.validateUser(body.email, body.password);
    if (user) {
      return { message: 'Login successful', user };
    } else {
      return { message: 'Invalid credentials' };
    }
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() userData: Partial<User>): Promise<User> {
    return this.userService.create(userData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    const userId = parseInt(id, 10);
    await this.userService.delete(userId);
    return { message: `User ${userId} deleted successfully` };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<User>): Promise<User> {
    const userId = parseInt(id, 10);
    return this.userService.update(userId, data);
  }

 @Put('rate')
async ratingUser(@Body() updateRatingDto: UpdateRatingDto): Promise<User> {
  const { id, rating } = updateRatingDto;
  return this.userService.updateRating(id, rating);
}



  //  Chart data for dashboard
  @Get('dashboard-data')
  async getDashboardData() {
    const users = await this.userService.findAll();
    return users.map(user => ({
      user: { name: user.name },
       email: user.email,
      rating: user.rating || 0
    }));
  }
}

