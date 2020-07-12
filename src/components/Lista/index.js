import React from 'react';

import ItemLista from '../ItemLista';
import './style.css';

export default function Lista({ dados, titulo }) {
    return (
        <div className="lista">
            <h2>{titulo}</h2>

            <div className="lista-busca">
                <form>
                    <input type="text" value="" placeholder="Pesquise aqui..." className="form-input"/>
                    <button type="submit" className="btn btn-confirma">Buscar</button>
                </form>
            </div>
            <div className="corpo-lista">
                {dados.map((item, indice) => (
                    <ItemLista item={item} key={indice}/>
                ))}
            </div>
        </div>

    );
}