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
        link: '/cadastro',
        titulo: 'Cadastros',
        icone: faBoxes,
        descricao: 'Cadastro e Edição.'
    },
    
]