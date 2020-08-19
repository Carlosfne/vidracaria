import React from 'react';
import { faBoxes, faBook, faCashRegister, faBezierCurve, faHandSparkles, faUser, faUsers, faGlasses, faWineGlass, faGlassCheers, faHourglassEnd, faAddressCard, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import Cabecalho from '../../components/Cabecalho';
import CardMenu from '../../components/CardMenu';
import './style.css';

export default function Home() {
    return (
        <div 
            className="home"
            // style={{backgroundImage: `url(${imagemBackground})`, backgroundSize: 'contain'}}
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
        link: '/vendas',
        titulo: 'Vendas',
        icone: faCashRegister,
        descricao: 'Tela de Vendas. '
    },
    {
        link: '/relatorios',
        titulo: 'Relatórios',
        icone: faBook,
        descricao: 'Visualizar Relatórios.',
    },
    {
        link: '/produtos',
        titulo: 'Produtos',
        icone: faBoxes,
        descricao: 'Cadastro e Edição de Produtos.'
    },
    {
        link: '/componentes',
        titulo: 'Componentes',
        icone: faBezierCurve,
        descricao: 'Cadastro de Componentes.',
    },
    {
        link: '/regras',
        titulo: 'Regras',
        icone: faHandSparkles,
        descricao: 'Cadastro de regras.',
    },
    {
        link: '/usuarios',
        titulo: 'Usuários',
        icone: faUsers,
        descricao: 'Cadastro de Usuários.',
    },
    {
        link: '/vidroproduto',
        titulo: 'Vidro por Produto',
        icone: faBoxes,
        descricao: 'Cadastro de Vidro por Produto.',
    },
    {
        link: '/componenteproduto',
        titulo: 'Componentes por Produto',
        icone: faBoxes,
        descricao: 'Cadastro de Componente por Produto.',
    },
    {
        link: '/estoque',
        titulo: 'Estoque',
        icone: faBoxes,
        descricao: 'Cadastro de Estoque.',
    },
    {
        link: '/cliente',
        titulo: 'Cliente',
        icone: faBoxes,
        descricao: 'Cadastro de Clientes.',
    },
    {
        link: '/vidro',
        titulo: 'Vidro',
        icone: faBoxes,
        descricao: 'Cadastro de Vidros.',
    },
    {
        link: '/projeto',
        titulo: 'Projeto',
        icone: faBoxes,
        descricao: 'Cadastro de Projetos.',
    },
]