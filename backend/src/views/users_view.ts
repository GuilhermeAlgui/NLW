import Users from '../models/Users';
import imagesView from './images_view';


export default {
    render(users: Users ){
        return{
            id: users.id,
            email:users.email,
            password: users.password,
        };
    },
    renderMany(users: Users[]){
        return users.map(user=> this.render(user))

    }
};