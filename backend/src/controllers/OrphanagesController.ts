import {Request, Response } from 'express';

import {getRepository,getConnection} from 'typeorm';

import * as Yup from 'yup'

import orphanageView from '../views/orphanages_view'

import Orphanage from '../models/Orphanage';

import Images from '../models/Images'




export default{

    async confirmOrphanage (request: Request, response: Response){

        const {id} = request.body;


        await getConnection()
            .createQueryBuilder()
            .update(Orphanage)
            .where("id = :id",{id :id})
            .set({pendente: false})
            .execute();

        return response.json({message: 'Orfanato confirmado com sucesso'})

    },

    async index( request: Request, response: Response){

        const orphanageRepository = getRepository(Orphanage);

        const orphanages = await orphanageRepository.find({
            relations: ['images'],
            where:{pendente: false}
            
        });

        return response.json(orphanageView.renderMany(orphanages));
    },

    async indexPendent( request: Request, response: Response){

        const orphanageRepository = getRepository(Orphanage);

        const orphanages = await orphanageRepository.find({
            relations: ['images'],
            where:{pendente: true}, 
            
        });

        return response.json(orphanageView.renderMany(orphanages));
    },


    async show( request: Request, response: Response){

        const  {id } = request.params;

        const orphanageRepository = getRepository(Orphanage);

        const orphanage = await orphanageRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return response.json(orphanageView.render(orphanage));
    },

    async create(request: Request,response :Response) {

        const{
            name,latitude,longitude,
            about,instructions,opening_hours,
            open_on_weekends,id
        } = request.body;

        console.log(name)

        
       
    
        const orphanageRepository = getRepository(Orphanage);

        const requestImages = request.files as Express.Multer.File[];

        const images = requestImages.map(image =>{
            return{ path: image.filename}
        })
    

        const data= {
            name,latitude,longitude,
            about,instructions,opening_hours,
            open_on_weekends: open_on_weekends==='true'
            ,pendente: true,
            images
        }


        const schema = Yup.object().shape({
            name:  Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about:  Yup.string().required().max(300),
            instructions:  Yup.string().required(),
            opening_hours:  Yup.string().required(),
            open_on_weekends:  Yup.boolean().required(),

            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))

        
        })


        await schema.validate(data,{
            abortEarly: false,
        })
        
        const orphanage = orphanageRepository.create(data)
    
        await orphanageRepository.save(orphanage);
    
    
        return response.status(201).json(orphanage)
    },

    async update(request: Request, response: Response){
        
        const{
            name,latitude,longitude,
            about,instructions,opening_hours,
            open_on_weekends,id,pendente
        } = request.body;
        const orphanageRepository = getRepository(Orphanage);

        let pendent = true;

        if(pendente === 'false'){
            pendent = false;
        }

        console.log(pendent)
        const requestImages = request.files as Express.Multer.File[];

        const images = requestImages.map(image =>{
            return{ path: image.filename}
        })
    

        const data= {
            id,name,latitude,longitude,
            about,instructions,opening_hours,
            open_on_weekends: open_on_weekends==='true'
            ,
            images
        }
        console.log(data)

        console.log(pendente)


        const schema = Yup.object().shape({
            name:  Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about:  Yup.string().required().max(300),
            instructions:  Yup.string().required(),
            opening_hours:  Yup.string().required(),
            open_on_weekends:  Yup.boolean().required(),

            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))

        
        })

        await schema.validate(data,{
            abortEarly: false,
        })

        await getConnection()
                .createQueryBuilder()
                .update(Orphanage)
                .where("id=:id",{id:id})
                .set({id,name,latitude,longitude,
                    about,instructions,opening_hours,
                    open_on_weekends, pendente: pendent})
                .execute()

        
        for(let i =0; i< images.length; i++){
            await getConnection()
            .createQueryBuilder()
            .insert()
            .into('images')
            .values([
                
                { path:images[i].path, orphanage: id }
             ])
            .execute();   
        }
        
      
        



            const result = await orphanageRepository.findOne(
                {
                           
                    where: {id: id}
                }
            )

        return response.status(201).json(result)

    },

    async del(request: Request, response: Response){


        const {id} = request.body;

        console.log(id)
        await getConnection()
                .createQueryBuilder()
                .delete()
                .from(Orphanage)
                .where("id= :id",{id})
                .execute();
        
        return response.status(201).json({message: 'Apagado com sucesso'})


    }
}