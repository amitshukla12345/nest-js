import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RegisterModule } from './register/register.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Wj24@Amit',
      database: 'dashboard',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    RegisterModule,
  ],
})
export class AppModule {}
