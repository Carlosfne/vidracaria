import React from 'react';
import { Link } from 'react-router-dom'
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import power from '../../images/power.png'

import './style.css';

export default function Cabecalho() {
    return (
        <div className="cabecalho">
            <a 
                href="/home"
                className="logo"
            >
                {/* <FontAwesomeIcon icon={faCartArrowDown} size="2x"/> */}
                <span>Vidraçaria</span>
            </a>
            <div className="notificacoes">
                <span>Seja Bem Vindo!</span>
            </div>
            <div className="config-usuario">            
                <Link to='/' onClick={() => {
                    localStorage.removeItem('authenticated')
                    }}
                >
                    <img className='img-logout' src={power} alt='power'></img>
                </Link>
            </div>
        </div>
    )
}