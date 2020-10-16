import Image from '../models/Images';


export default {
    render(image: Image ){
        return{
            id: image.id,

            url: `http://192.168.100.8:3333/uploads/${image.path}`
            
        };
    },
    renderMany(images: Image[]){
        return images.map(images=> this.render(images))

    }
};