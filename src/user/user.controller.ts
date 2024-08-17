import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post,Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateuserCreateDto } from "./dto/createUser.dto";
import { updateUserdto } from "./dto/updateUser.dto";

@Controller('/user')
export class UserController{
    constructor(private userService:UserService){}
    @Post('/signup')
    createUser(@Body() createUserDto:CreateuserCreateDto){
        return this.userService.createUser(createUserDto);
    }
    @Get(':id')
    findOneUser(@Param('id',ParseIntPipe) id:number){
        return this.userService.findUser(id);
    }
    @Delete(':id')
    deleteUser(@Param('id',ParseIntPipe)id:number){
        return this.userService.deleteUser(id);
    }
    @Put(':id')
    updateUser(@Body() updateUserdto:updateUserdto,@Param('id',ParseIntPipe)id:number){
        return this.userService.updateUser(updateUserdto,id);
    }
}