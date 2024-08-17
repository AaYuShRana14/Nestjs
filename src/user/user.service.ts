import { Injectable } from "@nestjs/common";
import { CreateuserCreateDto } from "./dto/createUser.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/User";
import { Repository } from "typeorm";

@Injectable()
export class UserService{
    constructor(@InjectRepository(User)
    private userRepositry:Repository<User>
    ){}
    getUser(){
        return "user found";
    }
    async createUser(createUserDto:CreateuserCreateDto){
        try{
            const user=await this.userRepositry.create(createUserDto);
            await this.userRepositry.save(user);
            return {"msg":"user created",user}
        }
        catch(e){
            return{"error":"error while creating user"};
        }
    }
}