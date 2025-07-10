import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class LoginService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string) {
    return this.userService.validateUser(email, password);
  }
}
