import React from 'react';
import Cabecalho from '../../components/Cabecalho';
import { Link } from 'react-router-dom';
import './styles.css'

export default function Cadastros() {
  return  (
    <div 
        className="home"        
    >
        <Cabecalho />
        <div className="home-corpo">
            <div className='list-links'>
              {/* <Link to='/produtos' > Cadastro de Produtos </Link> */}
              {/* <Link to='/sub-produtos' > Cadastro de Sub-produtos </Link> */}
              <div className='botao-menus'>
                <Link to='/componentes' > Cadastro de Componentes </Link>
              </div>
              <div className='botao-menus'>
                <Link to='/regras' > Cadastro de Regras </Link>
              </div>
              <div className='botao-menus'>
                <Link to='/usuarios' > Cadastro de Usuários </Link>
              </div>
              <div className='botao-menus'>
                <Link to='/vidroproduto' > Cadastro de Vidros por produto</Link>
              </div>
              <div className='botao-menus'>
                <Link to='/componenteproduto' > Cadastro de Componente por produto </Link>
              </div>
              <div className='botao-menus'>
                <Link to='/estoque' > Cadastro de Estoque </Link>
              </div>
              <div className='botao-menus'>
                <Link to='/cliente' > Cadastro de Cliente </Link>
              </div>
              <div className='botao-menus'>
                <Link to='/vidro' > Cadastro de Vidro </Link>
              </div>
              <div className='botao-menus'>
                <Link to='/projeto' > Cadastro de Projeto </Link>
              </div>
              
            </div>
        </div>  
    </div>
  )
}