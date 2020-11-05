


import React, {useState} from 'react'

import Happy from '../images/happy.svg'
import {GoHeart} from 'react-icons/go'
import { FiArrowLeft } from 'react-icons/fi';


import '../styles/pages/login.css'

import '../styles/pages/forgot-password.css'


import { useHistory } from 'react-router-dom';

export default function Login(){

    const [email,setEmail] = useState('');
    const [senha,setSenha] = useState('');


    const {goBack} = useHistory()
    return(
        <div id='page-login'>
            <div className='big-happy'>
                <img src={Happy} alt="Happy"/>

            </div>

            <div className='login-container'>
                
                <div className='login-form'>

                    

                    <h1>Esqueci a Senha</h1>
                    <p className ='forgot-password-text'>Sua redefinição de Senha será enviado ao email cadastrado</p>
                
                    <input 
                        className='email-input' 
                        placeholder='email' 
                        type="text"
                        value={email}
                        onChange={event=> setEmail(event.target.value)}
                        />
                   
                   

                    {email !== ''  ? 
                    ( <button type='button' className='login-button-on'>
                    Entrar
                </button>) 
                : ( <button type='button' className='login-button-off'>
                Entrar
            </button>)   
                }

                   
                </div>



                <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#15C3D6" />
          </button>
        </footer>

            </div>
        </div>
    )
}