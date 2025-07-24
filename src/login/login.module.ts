import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { UserModule } from '../user/user.module'; 

@Module({
  imports: [UserModule], 
  providers: [LoginService],
})
export class LoginModule {}
