import React, {useState,useEffect, FormEvent, ChangeEvent} from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo, FiArrowLeft } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import {useHistory, useParams} from 'react-router-dom'
import {  FiPlus , FiXCircle, FiThumbsUp} from "react-icons/fi";
import {LeafletMouseEvent} from 'leaflet';

import '../styles/pages/orphanage.css';
import '../styles/pages/orphanage-confirm.css';
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";
 

interface Orphanage {
  id: number,
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekend: boolean;
  pendente: boolean,
  images: Array<{
    id: number;
    url:string;
  }>;
}
interface OrphanageParams{
  id: string;
}

export default function Orphanage() {

  const params = useParams<OrphanageParams>();
  const [orphanage,setOrphanage] = useState<Orphanage>({
    id: 0,
    latitude: 0,
  longitude: 0,
  name: '',
  about: '',
  instructions: '',
  opening_hours: '',
  open_on_weekend: false,
  pendente: false,
  images: []
  });
  const [activeImageIndex,setActiveImageIndex] = useState(0);


  const history = useHistory()

  const [position,setPosition] = useState({latitude:0,longitude:0});


  const[name,setName] = useState('')
  const[about,setAbout] = useState('')
  const[instructions,setInstructions] = useState('')
  const[opening_hours,setOpeningHours] = useState('')
  const[open_on_weekends,setOpenOnWeekends] = useState(true)
  const [pendente,setPendent] = useState(true)
  const [images,setImages] = useState<File[]>([]);

  const [initiate,setInitiate] = useState(false)

  const [previewImages,setPreviewImages] = useState<string[]>([]);
  console.log(orphanage)


  useEffect(()=> {
      api.get(`orphanages/${params.id}`).then(response =>{
           setOrphanage(response.data)
           setInitiate(true)
      })
      console.log(orphanage)
     
      console.log('name: '+name)


  },[params.id]); 

  if(!orphanage){
    return <p>Loading</p>
  }

  console.log(orphanage.open_on_weekend)
  async function handleUpdate(event: FormEvent){
    event.preventDefault();

    const {latitude,longitude} = position

  

    const data = new FormData();
    data.append('id',params.id)
    data.append('name',name);
    data.append('latitude',String(latitude));
    data.append('longitude',String(longitude));
    data.append('about',about);
    data.append('instructions',instructions);
    data.append('opening_hours',opening_hours);
    data.append('open_on_weekends',String(open_on_weekends));
    data.append('pendente',String(pendente));
    images.forEach(image=>{
      data.append('images',image);
    })


   const r = await api.put('orphanages/update',data);
    console.log(r)
    alert('Cadastro realizado com sucesso')
    history.push('/app');
   }

   function handleMapClick(event:LeafletMouseEvent){
    const {lat,lng} =event.latlng

    setPosition({
      latitude: lat,
      longitude: lng,
    })
  }
  
  
  function handleSelectImages(event: ChangeEvent<HTMLInputElement>){

    if(!event.target.files){
      return;
    }
    const selectedImages = Array.from(event.target.files)
    console.log(selectedImages)
    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image=>{
      return URL.createObjectURL(image);
    });


    setPreviewImages(selectedImagesPreview)
    console.log(previewImages)

  }

  function handleDefaultValues(){
    setName(orphanage.name);
    setAbout(orphanage.about);
    setInstructions(orphanage.instructions);
    setOpenOnWeekends(orphanage.open_on_weekend);
    setOpeningHours(orphanage.opening_hours);
    setPendent(orphanage.pendente)
    let preImg =[]
    for(let i = 0; i< orphanage.images.length; i++){
      preImg.push(orphanage.images[i]?.url);
    }
    setPreviewImages(preImg)
    setPosition({latitude: orphanage.latitude, longitude: orphanage.longitude})
  }

  if(initiate){
    handleDefaultValues();
    setInitiate(false);
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar/>

      <main>
        <form onSubmit={handleUpdate} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[orphanage.latitude,orphanage.longitude]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>


              {position.latitude !==0 &&(
              <Marker 
                interactive={false} 
                icon={mapIcon} 
                position={[position.latitude,position.longitude]} />
               )
            }

              {/*  */}            
              
              
              </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input onClick={()=>console.log(name)}
                id="name"
                value={name}
                onChange={event=>setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="name" 
                maxLength={300}
                value={about} 
                onChange={event=>setAbout(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image=>{
                  return(
                    <img key={image} src={image} alt={name}/>
                  )
                })}
                <label htmlFor="image[]"  className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input multiple onChange={handleSelectImages} type="file" id="image[]"/>

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions"
                value={instructions} 
                onChange={event=>setInstructions(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horario de funcionamento</label>
              <input 
                id="opening_hours"
                value={opening_hours} 
                onChange={event=>setOpeningHours(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button"
                  className={open_on_weekends ? 'active' : ''}
                  onClick={()=> setOpenOnWeekends(true)}
                  >
                    Sim
                </button>
                <button 
                className={!open_on_weekends ? 'active' : ''}
                  type="button"
                  onClick={()=> setOpenOnWeekends(false)}>
                    Não
                  </button>
              </div>
            </div>
          </fieldset>

          <div className="acept_container">
            <button onClick={()=>{setPendent(true)}} className="confirm-button-red" type="submit">
                <FiXCircle size={24} color="#FFF" />
                Recusar
            </button>
            <button onClick={()=>{setPendent(false)}} className="confirm-button-green" type="submit">
            <FiThumbsUp size={24} color="#FFF" />

             Aceitar
            </button>
           </div>  

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;


/**
 *  
          <div className="acept_container">
            <button className="confirm-button-red" type="submit">
                <FiXCircle size={24} color="#FFF" />
                Recusar
            </button>
            <button className="confirm-button-green" type="submit">
            <FiThumbsUp size={24} color="#FFF" />

             Aceitar
            </button>
           </div>  
          
 */