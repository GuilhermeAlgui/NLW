import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm';





@Entity('users')
export default class Users {
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column()
    login: string;

    @Column()
    password:string;

    @Column()
    email:string;

   @Column()
   passwordToken: string;

   @Column()
   TokenExpire: Date;

   


}