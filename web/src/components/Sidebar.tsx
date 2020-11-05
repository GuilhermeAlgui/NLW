import React from 'react';
import { FiArrowLeft, FiMapPin, FiAlertCircle} from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import mapMarkerImg from '../images/mapMarker.svg';


import '../styles/components/sidebar.css';

interface sidebarProps{

  cadastro?: boolean,
  children?: JSX.Element | JSX.Element[]


}

export default function Sidebar({cadastro = false, children} : sidebarProps){

    const{goBack} = useHistory();
    return(
        <aside className="app-sidebar">
        <img src={mapMarkerImg} alt="Happy" />


        {children}
        


        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </aside>
    );
}