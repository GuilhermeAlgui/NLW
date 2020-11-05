


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
    const [senha2,setSenha2] = useState('');


    const {goBack} = useHistory()
    return(
        <div id='page-login'>
            <div className='big-happy'>
                <img src={Happy} alt="Happy"/>

            </div>

            <div className='login-container'>
                
                <div className='login-form'>

                    

                    <h1>Redefinição de senha</h1>
                    <p className ='forgot-password-text'>Confirme sua nova senha</p>
                
                    <input 
                        className='email-input' 
                        placeholder='Senha' 
                        type="text"
                        value={senha}
                        onChange={event=> setSenha(event.target.value)}
                        />
                    <div className='password-input'>
                        <input  
                            className='email-input' 
                            placeholder='Nova Senha' 
                            type="text"
                            value={senha2}
                            onChange={event=> setSenha2(event.target.value)}/>
                    </div>

                   

                    {senha !== ''  && senha2!=="" ? 
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