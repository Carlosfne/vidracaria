import React, { useState } from 'react';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import api from '../../services/api';
import { useHistory }from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import './style.css';

export default function Login() {
    const history = useHistory();
    const [ nome, setNome ] = useState('')
    const [ senha, setSenha ] = useState('')
    const [ error, setError ] = useState('')

    async function handleLogin(e){
        e.preventDefault();
        // history.push('home')
        var formData = new FormData()
            formData.append('nome', nome)
            formData.append('senha', senha)
        api.post('usuario/login/',formData)
        .then(response => {
            console.log('RESPOSTA',response.data.user.id)
            var userId = response.data.user.id
            toast.info('Login realizado com sucesso!')
            localStorage.setItem('authenticated', userId)
            setTimeout(() => {
                history.push('/home')                
            }, 2000);
        })
        .catch(error => {
            console.log(error.response)
            setError('Informações de Login erradas favor verificar')
        })
      }

    return (
        <div 
            className="corpo"
            // style={{backgroundImage: `url(${imagemBackground})`, backgroundSize: 'contain'}}
        >
            
            <div className="formulario-login">
                <div className="logo">
                    {/* <FontAwesomeIcon icon={faCartArrowDown} size="2x" /> */}
                    <span>VIDROCOM</span>
                </div>
                <form onSubmit={handleLogin}>
                    { error ? <h4>{error}</h4> : ''}
                    <input 
                        type="text" 
                        className="form-input"
                        placeholder="E-mail"
                        onChange={e => setNome(e.target.value)}
                    />
                    <input 
                        type="password" 
                        className="form-input"
                        placeholder="Senha"
                        onChange={e => setSenha(e.target.value)}
                    />

                    <button type="submit" className="btn-login btn-confirma">Entrar</button>
                </form>
            </div>
        </div>
    )
}