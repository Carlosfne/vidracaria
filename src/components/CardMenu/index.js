import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './style.css';

const configIcon = {
    fonSize: "50px"
}
export default function CardMenu({ item }) {
    return (
        <a 
            className="card-menu"
            href={item.link}
        > 
            <div className="card-icone">
                <FontAwesomeIcon icon={item.icone} size="8x"/>
            </div>
            <div className="card-titulo">{item.titulo}</div>
            <p className="card-descricao">{item.descricao}</p>
        </a>
    )
}