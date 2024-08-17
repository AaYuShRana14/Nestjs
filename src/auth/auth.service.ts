import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/hash/hash.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService:UserService,
        private hashService:HashService,
        private jwtService:JwtService
    ){}
    async validateUser(email:string,password:string){
        try{
            const user=await this.userService.findByEmail(email);
            const passwordMatch=await this.hashService.comparePasswords(password,user.password);
            if(passwordMatch){
                return user;
            }
            return null;
        }
        catch(e){
            return null;
        }
    }
    async login(user:any){
        const payload={email:user.email,id:user.id};
        try {
            return { token: this.jwtService.sign(payload) };
        } catch (e) {
            console.log(`Token generation failed: ${e.message}`);
        }
        
    }
}
