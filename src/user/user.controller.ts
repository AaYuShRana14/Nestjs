import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateuserCreateDto } from "./dto/createUser.dto";

@Controller('/user')
export class UserController{
    constructor(private userService:UserService){}
    @Get()
    user(){
        return this.userService.getUser();
    }
    @Post('/signup')
    createUser(@Body() createUserDto:CreateuserCreateDto){
        return this.userService.createUser(createUserDto);
    }
    @Get('/:id')
    findOneUser(@Param('id',ParseIntPipe) id:number){
        return {id};
    }
}