import  {Router } from 'express';
import multer from 'multer';


import uploadConfig from './config/upload'
import OrphanageController from './controllers/OrphanagesController';
import UsersController from './controllers/UsersController';



const routes = Router();

const upload = multer(uploadConfig);

routes.post('/orphanages', upload.array('images'), OrphanageController.create);
routes.put('/orphanages/update', upload.array('images'), OrphanageController.update);
routes.get('/orphanages/:id', OrphanageController.show);
routes.get('/orphanages' ,OrphanageController.index);
routes.put('/orphanages/delete' ,OrphanageController.del);
routes.get('/orphanage/pendent' ,OrphanageController.indexPendent);
routes.post('/orphanage/confirm',OrphanageController.confirmOrphanage);

routes.post('/users', UsersController.create)
routes.post('/user', UsersController.index)
routes.post('/forgot_password', UsersController.forgot_password_request)





export default routes;