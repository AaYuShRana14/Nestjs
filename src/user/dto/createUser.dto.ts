import { IsEmail, IsString, Length } from "class-validator";

export class CreateuserCreateDto{
    @IsString()
    username:string
    @IsString()@Length(6,20)
    password:string
    @IsEmail()
    email:string
    @IsString()
    address:string=""
} 