import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/User";
import { HashModule } from "../hash/hash.module";
@Module({
    controllers:[UserController],
    providers:[UserService],
    imports:[HashModule,TypeOrmModule.forFeature([User])]
})
export class UserModule{

}