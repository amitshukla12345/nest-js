import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // ✅ Register user with hashed password
  async create(userData: Partial<User>): Promise<User> {
    if (userData.password) {
      const saltRounds = 10;
      userData.password = await bcrypt.hash(userData.password, saltRounds);
    }

    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  // ✅ Validate user during login
  async validateUser(email: string, plainPassword: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email });

    if (user && await bcrypt.compare(plainPassword, user.password)) {
      return user;
    }

    return null;
  }

  async delete(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, userData);
    const updated = await this.userRepository.findOneBy({ id });

    if (!updated) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return updated;
  }
}
