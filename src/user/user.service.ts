import { Injectable } from "@nestjs/common";
import { CreateuserCreateDto } from "./dto/createUser.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/User";
import { Repository } from "typeorm";
import { updateUserdto } from "./dto/updateUser.dto";
import * as bcrypt from 'bcrypt';
import { HashService } from "src/hash/hash.service";
import { loginUserDto } from "./dto/loginUser.dto";
@Injectable()
export class UserService{
    constructor(@InjectRepository(User)
    private userRepository:Repository<User>,
    private hashService:HashService
    ){}
    async createUser(createUserDto:CreateuserCreateDto){
        try{
            const hashedPassword = await this.hashService.hashPassword(createUserDto.password);
            const user = this.userRepository.create({ ...createUserDto, password: hashedPassword });
            await this.userRepository.save(user);
            return {"msg":"user created",user}
        }
        catch(e){
            return{"error":"error while creating user"};
        }
    }
    async findUser(id:number){
        try{
            const user=await this.userRepository.findOneBy({"id":id});
            if(!user){
                return {"error":"error while getting user"};
            }
            return {"username":user.username,"email":user.email};
        }
        catch(e){
            return{"error":"error while getting user"};
        }
    }
    async deleteUser(id:number){
        try{
            const data=await this.userRepository.delete({"id":id});
            if(data.affected==0){
                return {"error":"error while deleting user"};
            }
            return {"msg":"deleted user"}
        }
        catch(e){
            return {"error":"error while deleting user"};
        }
    }
    async updateUser(updateUserdto:updateUserdto,id:number){
        try{
            const user=await this.userRepository.findOneBy({"id":id});
            if(!user){
                return{"error":"error while getting user"}; 
            }
            console.log(user);
            user.username = updateUserdto.username ?? user.username;
            user.address = updateUserdto.address ?? user.address;
           await this.userRepository.save(user);
            return {"msg":"user updated"}
        }
        catch(e){
            return{"error":"error while getting user"};
        }
    }
    async signin(loginUserDto:loginUserDto){
        try{
            const user=await this.userRepository.findOneBy({"email":loginUserDto.email});
            if(!user){
                return{"error":'invalid credentials'}; 
            }
            const passwordMatch=await this.hashService.comparePasswords(loginUserDto.password,user.password);
            if(passwordMatch){
                return{"msg":"logged in"}
            }
            return{"error":'invalid credentials'}; 
        }
        catch(e){
            return{"error":'invalid credentials'}; 
        }
    }
}