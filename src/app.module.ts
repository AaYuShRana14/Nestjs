import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import * as dotenv from "dotenv";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/User';
import { HashModule } from './hash/hash.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './auth/auth.constant';
dotenv.config();
@Module({
  imports: [UserModule,HashModule,JwtModule.register({
    secret:jwtConstants.secret,
    signOptions:{expiresIn:'24h'}
  }),AuthModule,TypeOrmModule.forRoot({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,             
    logging: false,
    entities: [User],
    extra: {
        ssl: {
            rejectUnauthorized: false, 
        },
    }
  })],
  controllers: [AppController, AuthController],
  providers: [AppService,AuthService],
})
export class AppModule {}
