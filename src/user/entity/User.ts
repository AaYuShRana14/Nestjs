import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"users"})
export class User{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    username:string
    @Column()
    password:string
    @Column({unique:true})
    email:string
    @Column({nullable:true})
    address:string
}