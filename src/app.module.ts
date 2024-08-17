import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import * as dotenv from "dotenv";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/User';
dotenv.config();
@Module({
  imports: [UserModule,TypeOrmModule.forRoot({
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
