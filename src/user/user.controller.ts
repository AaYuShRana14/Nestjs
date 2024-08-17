import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post,Put, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateuserCreateDto } from "./dto/createUser.dto";
import { updateUserdto } from "./dto/updateUser.dto";
import { AuthGuard } from "@nestjs/passport";

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
    @UseGuards(AuthGuard('jwt'))
    @Delete('/')
    deleteUser(@Req() req:any){
        const id=req.user.id;
        return this.userService.deleteUser(id);
    }
    @UseGuards(AuthGuard('jwt'))
    @Put('/update')
    updateUser(@Body() updateUserdto:updateUserdto,@Req() req:any){
        const id=req.user.id;
        return this.userService.updateUser(updateUserdto,id);
    }
}