import React, { useState } from 'react';
import { faTrash, faPencilAlt, faPlus, faBox } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './style.css';

export default function ItemLista({item}) {
    
    const [detalhes, setDetalhes] = useState(false);

    return (
        <div 
            className="corpo-item-lista"
            style={detalhes ? {maxHeight: "none"} : {maxHeight: "55px"}}
        >
            <div 
                className="item-lista" 
                title="Clique para ver os detalhes"
                onClick={() => setDetalhes(!detalhes)}                
            >
                <div className="item-lista-id">{item.id}</div>
                <div className="item-lista-dados-principais">
                    <div className="nome">
                        {item.nome}
                    </div>
                    <div className="quantidade">
                        {`${item.estoque} ${item.unidadeMedida}`}
                    </div>
                </div>
                <div className="item-lista-acoes">
                    <button type="" title="Adicionar Estoque">
                        <FontAwesomeIcon icon={faPlus} color="#a8ffe5" style={{marginRight: '2px'}}/>
                        <FontAwesomeIcon icon={faBox} color="#a8ffe5"/>
                    </button>
                    <button type="" title="Excluir Produto">
                        <FontAwesomeIcon icon={faTrash} color="#fa9588"/>
                    </button>
                    <button type="" title="Editar Produto">
                        <FontAwesomeIcon icon={faPencilAlt} color="#DDD" />
                    </button>
                </div>
            </div>

            {
                detalhes && 
                <div className="item-detalhes">
                    <div className="campos">
                        <strong>Descrição: </strong>
                        <span>{item.descricao}</span>
                    </div>
                    <div className="campos">
                        <strong>Categoria: </strong>
                        <span>{item.categoria}</span>
                    </div>
                    <div className="campos">
                        <strong>Unidade de Medida: </strong>
                        <span>{item.unidadeMedida}</span>
                    </div>
                    <div className="campos">
                        <strong>Estoque: </strong>
                        <span>{item.estoque}</span>
                    </div>
                    <div className="campos">
                        <strong>Valor de Compra: </strong>
                        <span>{item.valorCompra}</span>
                    </div>
                    <div className="campos">
                        <strong>Valor de Venda: </strong>
                        <span>{item.valorVenda}</span>
                    </div>
                    <div className="campos">
                        <strong>Preço do Estoque: </strong>
                        <span>{item.valorCompra * item.estoque}</span>
                    </div>
                    <div className="campos">
                        {/* <strong>Preço do Estoque: </strong>
                        <span>{item.valorCompra * item.estoque}</span> */}
                    </div>
                </div>
            }
        </div>
    );
}