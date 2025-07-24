import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RegisterModule } from './register/register.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    


    TypeOrmModule.forRoot({
      type: 'mysql',
    /*  host: 'localhost',*/
      port: 3306,
      username: 'root',
      password: 'Wj24@Amit',
      database: 'dashboard',
      autoLoadEntities: true,
      synchronize: true,
       
    
    }),
    UserModule,
    RegisterModule,
    DashboardModule,
    
  ],
})
export class AppModule {}
