import {Request, Response } from 'express';

import {getRepository,getConnection} from 'typeorm';

import * as Yup from 'yup'
import crypto from 'crypto';

import orphanageView from '../views/orphanages_view'

import Orphanage from '../models/Orphanage';

import Users from '../models/Users'
import usersView from '../views/users_view';

var jwt = require('jsonwebtoken');


const bcrypt = require('bcrypt');
const saltRounds = 10;


interface USER{
    id: number,
    login: string,
    email: string,
    password:string,
}



export default{

    async index(request: Request, response: Response){

        const{
            email, password
        } = request.body

        const userRepository = getRepository(Users);
        
        const user = await userRepository.findOne(
            {
                select: ["email","id","login","password"],   
                where: {email: email}
            }
        )


        let verdadeiro = false;
        

        console.log(user);
        
        if(!user){
            return response.status(401).json({message: "Usuario nao encontrado", auth: false,})

        }

        console.log(user?.id);
         verdadeiro = await bcrypt.compare(password,user?.password)


         console.log(verdadeiro)

        var token = jwt.sign({id :user?.id},'12345689',{
            expiresIn: 3000
        });
        
        if(verdadeiro){
            return response.status(201).json({user,auth: true, token: token})
        }
      
            return response.status(400).json({message:"deu ruim", auth: false})
        
         
      





    },


    async create(request: Request, response: Response){

        const{
            email, password
        } = request.body
        const login = email;
        const userRepository =  getRepository(Users)
        let userSendOut;

       const predata = {email}

       let correto = false;

       try {

        const hash = await bcrypt.hash(password, saltRounds);

        const data = {login,email,password : hash}

        const user = userRepository.create(data)
        await userRepository.save(user);
        correto= true;
        userSendOut = user;
        return response.status(201).json(data)
           
       } catch (error) {
           
       }

/*     
      await bcrypt.hash(password, saltRounds,async function(err: any, hash:any) 
        {
            const data = {login,email,password : hash}

            const user = userRepository.create(data)
            await userRepository.save(user);
            correto= true;
            userSendOut = user;


            console.log(correto)

        });

        */
        return response.status(400).json({predata, correto})


        


    },


    async forgot_password_request(request: Request, response: Response){
        const {email} = request.body;
        const userRepository = getRepository(Users);

        try {
            const user = await userRepository.findOne(
                {
                    select: ["email","id"],   
                    where: {email: email}
                }
            )
            if(!user){
                return response.status(401).json({message: "Usuario nao encontrado"})

            }

            const token = crypto.randomBytes(20).toString('hex');
            const now = new Date();
            now.setHours(now.getHours()+1);

          
            await getConnection()
                    .createQueryBuilder()
                    .update(Users)
                    .where("id= :id",{id:user.id})
                    .set({passwordToken:token, TokenExpire:now })
                    .execute();
            

            const result = await userRepository.findOne(
                {
                       
                    where: {email: email}
                }
            )
            return response.status(201).json(result)
        } catch (error) {

            return response.status(401).json({message: "Erro na recuperação de senha"})
            
        }

    }


}