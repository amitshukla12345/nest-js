import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ✅ Register new user (password will be hashed in service)
  @Post('register')
  register(@Body() userData: Partial<User>): Promise<User> {
    return this.userService.create(userData);
  }

  // ✅ Login user (compare hashed password)
  @Post('login')
async login(@Body() body: { email: string; password: string }) {
  const user = await this.userService.validateUser(body.email, body.password);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return { message: 'Login successful', user: userWithoutPassword };
  } else {
    return { message: 'Invalid credentials' };
  }
}


  // ✅ Get all users
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  // ✅ Create user (used internally if needed)
  @Post()
  create(@Body() userData: Partial<User>): Promise<User> {
    return this.userService.create(userData);
  }

  // ✅ Delete user
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    const userId = parseInt(id, 10);
    await this.userService.delete(userId);
    return { message: `User ${userId} deleted successfully` };
  }

  // ✅ Update user
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<User>): Promise<User> {
    const userId = parseInt(id, 10);
    return this.userService.update(userId, data);
  }
}
