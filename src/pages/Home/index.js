import React from 'react';
import { faBoxes, faBook, faCashRegister } from '@fortawesome/free-solid-svg-icons';
import Cabecalho from '../../components/Cabecalho';
import CardMenu from '../../components/CardMenu';
import './style.css';

import imagemBackground from '../../images/backgroundDolar.png';

export default function Home() {
    return (
        <div 
            className="home"
            style={{backgroundImage: `url(${imagemBackground})`, backgroundSize: 'contain'}}
        >
            <Cabecalho />
            <div className="home-corpo">
                {ItensMenu.map((item) => <CardMenu item={item}/>)}
            </div>  
        </div>
    )
}

const ItensMenu = [
    {
        link: '/produtos',
        titulo: 'Produtos',
        icone: faBoxes,
        descricao: 'Cadastro e Edição de Produtos, incluindo Gestão de Estoques'
    },
    {
        link: '/vendas',
        titulo: 'Vendas',
        icone: faCashRegister,
        descricao: 'Registrar as vendas realizadas no dia. '
    },
    {
        link: '/relatorios',
        titulo: 'Relatórios',
        icone: faBook,
        descricao: 'Visualizar Relatórios de Venda por Períodos, Clientes ou Produtos',
    },
]