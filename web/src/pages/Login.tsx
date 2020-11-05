import React,{useState} from 'react';

import Happy from '../images/happy.svg'
import {GoHeart} from 'react-icons/go'
import { FiArrowLeft } from 'react-icons/fi';


import '../styles/pages/login.css'
import { useHistory } from 'react-router-dom';
import api from '../services/api';

export default function Login(){

    const [email,setEmail] = useState('');
    const [senha,setSenha] = useState('');
    const [rememberMe,setRememberMe] = useState(false);
    const history = useHistory()

    async function handleLogin(){
        console.log(rememberMe)
        const data = {
            email, password: senha
        }
        console.log(data)
        try {
            const response =   await api.post('user',data);
            const {token} = response.data;
            const {id} = response.data.user;
            console.log(response.data)
            
            if(rememberMe){
                localStorage.setItem('@happy2.0/token',token);
                localStorage.setItem('@happy2.0/id',id);
                sessionStorage.setItem('@happy2.0/token',token)
                sessionStorage.setItem('@happy2.0/id',id)
            }
            else{
                sessionStorage.setItem('@happy2.0/token',token)
                sessionStorage.setItem('@happy2.0/id',id)
            }
            history.push('/orphanages/list');

        } catch (error) {
            alert('Erro foi encontrado')
        }
     

    }

    const {goBack} = useHistory()
    return(
        <div id='page-login'>
            <div className='big-happy'>
                <img src={Happy} alt="Happy"/>

            </div>

            <div className='login-container'>
                
                <div className='login-form'>

                    

                    <h1>Fazer login</h1>
                
                    <input 
                        className='email-input' 
                        placeholder='email' 
                        type="text"
                        value={email}
                        onChange={event=> setEmail(event.target.value)}
                        />
                    <div className='password-input'>
                        <input  
                            className='email-input' 
                            placeholder='password' 
                            type="password"
                            value={senha}
                            onChange={event=> setSenha(event.target.value)}/>
                    </div>

                    <div className= 'password-container'>
                        <div className='lembrar-senha'>
                          <input  type="checkbox" defaultChecked={rememberMe} onChange={()=>{setRememberMe(!rememberMe)}}  name="remember" id="remember"/>
                          <p>Lembrar-me</p>
                        </div>
                        <a href="">Esqueci minha Senha</a>
                    </div>

                    {email !== '' && senha !== "" ? 
                    ( <button onClick={handleLogin} type='button' className='login-button-on'>
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