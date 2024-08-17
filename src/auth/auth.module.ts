import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { AuthService } from './auth.service';
import { HashModule } from "src/hash/hash.module";
import { LocalStrategy } from "./local.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
@Module({
    imports:[UserModule,HashModule,PassportModule,JwtModule],
    providers:[AuthService,LocalStrategy,JwtStrategy],
    controllers:[AuthController]
})
export class AuthModule{};