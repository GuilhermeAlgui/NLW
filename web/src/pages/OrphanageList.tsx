import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import mapIcon from "../utils/mapIcon";
import {FiEdit, FiTrash} from 'react-icons/fi'
import { FiArrowLeft, FiMapPin, FiAlertCircle} from 'react-icons/fi';

import '../styles/pages/orphanageList.css';

import { Map, Marker, TileLayer } from "react-leaflet";
import api from '../services/api';
import Orphanage from './Orphanage';
import { Link, useHistory } from 'react-router-dom';
interface Orphanage {
    id:number,
    latitude: number,
    longitude: number,
    name: string,
}





export default function OrphanageList(){
    const [orphanages,setOrphanages] = useState<Orphanage[]>([]);
    const [orphanagesP,setOrphanagesP] = useState<Orphanage[]>([]);
    const [mainPage,setMainPage] = useState(true);
    const history = useHistory();

    useEffect(()=> {
        api.get('orphanages').then(response =>{
             setOrphanages(response.data)
        })
        api.get('orphanage/pendent').then(response =>{
            setOrphanagesP(response.data)
        })

    },[]);
    async function OrphanageDelete(id: number){


        const data = {
            id: id
        }



        await api.put('orphanages/delete',data)


        history.push('/orphanages/list')
    
    }
    return(
        <div id='orphanage-list-page'>
            <Sidebar cadastro={true}>
                
          <div className= 'sidebar-items'>
            <div onClick={()=>{setMainPage(true)}} className= { mainPage? 'sidebar-confirmed': 'sidebar-pendent'}>
              <FiMapPin size={24} color={ mainPage?'#0089A5': "#FFF"} />
            </div>
            <div onClick={()=>{setMainPage(false)}} className= { mainPage? 'sidebar-pendent': 'sidebar-confirmed'}>
              <FiAlertCircle size={24} color={ mainPage?'#FFF': "#0089A5"} />
            </div>

          </div>
        
            </Sidebar>
            <main>
                <h1>{mainPage ?"Orfanatos Cadastrados": "Orfanatos Pendentes"}</h1>
                <div className='orphanage-list'>

                    <div className='orphanage-item'>


                      {
                          mainPage ? orphanages.map(orphanage=>{
                            return(
                                <div className={'orphanage-item-container'} key={orphanage.id}>

                                <div className="map-container">
                            
                            <Map 
                                center={[orphanage.latitude,orphanage.longitude]} 
                                zoom={14} 
                                style={{ width: '100%', height: 280 }}
                                dragging={false}
                                touchZoom={false}
                                zoomControl={false}
                                scrollWheelZoom={false}
                                doubleClickZoom={false}
                            >
                                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/> 

                                <Marker interactive={false} icon={mapIcon}  
                                    position={[orphanage.latitude,orphanage.longitude]} />
                            </Map>

                        </div>

                        

                        <footer>
                            <p>{orphanage.name}</p>
                            <div className='orphanage-options'>
                                <Link to={`/orphanages/edit/${orphanage.id}`} className='option-write'>
                                    <FiEdit size={24} color={'#15C3D6'} />
                                </Link>
                                <button onClick={()=> {
                                    if((window.confirm('ola'))){
                                        OrphanageDelete(orphanage.id)
                                    }
                                    
                                    }} className='option-delete'>
                                    <FiTrash size={24} color={'#15C3D6'} />
                                </button>
                            </div>
                        </footer>
                                </div>

                            )
                        }) : orphanagesP.map(orphanage=>{
                            return(
                                <div className={'orphanage-item-container'} key={orphanage.id}>

                                <div className="map-container">
                            
                            <Map 
                                center={[orphanage.latitude,orphanage.longitude]} 
                                zoom={14} 
                                style={{ width: '100%', height: 280 }}
                                dragging={false}
                                touchZoom={false}
                                zoomControl={false}
                                scrollWheelZoom={false}
                                doubleClickZoom={false}
                            >
                                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/> 

                                <Marker interactive={false} icon={mapIcon}  
                                    position={[orphanage.latitude,orphanage.longitude]} />
                            </Map>

                        </div>

                        

                        <footer>
                            <p>{orphanage.name}</p>
                            <div className='orphanage-options'>
                                <Link to={`/orphanages/confirm/${orphanage.id}`} onClick={()=>{console.log(orphanages)}} className='option-write'>
                                    <FiEdit size={24} color={'#15C3D6'} />
                                </Link>
                                <button onClick={()=> {
                                    if((window.confirm('ola'))){
                                        OrphanageDelete(orphanage.id)
                                    }
                                    
                                    }} className='option-delete'>
                                    <FiTrash size={24} color={'#15C3D6'} />
                                </button>
                            </div>
                        </footer>
                                </div>

                            )
                        })
                      }

                 




                    </div>



                </div>
            </main>
        </div>
    )
}