import { Injectable } from "@nestjs/common";
import { CreateuserCreateDto } from "./dto/createUser.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/User";
import { Repository } from "typeorm";
import { updateUserdto } from "./dto/updateUser.dto";

@Injectable()
export class UserService{
    constructor(@InjectRepository(User)
    private userRepositry:Repository<User>
    ){}
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
    async findUser(id:number){
        try{
            const user=await this.userRepositry.findOneBy({"id":id});
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
            const data=await this.userRepositry.delete({"id":id});
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
            const user=await this.userRepositry.findOneBy({"id":id});
            if(!user){
                return{"error":"error while getting user"}; 
            }
            console.log(user);
           user.username=updateUserdto.username;
           user.address=updateUserdto.address;
           await this.userRepositry.save(user);
            return {"msg":"user updated"}
        }
        catch(e){
            return{"error":"error while getting user"};
        }
    }
}