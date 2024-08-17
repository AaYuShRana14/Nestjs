import { IsString } from "class-validator";

export class updateUserdto{
    @IsString()
    address:string
    @IsString()
    username:string
}