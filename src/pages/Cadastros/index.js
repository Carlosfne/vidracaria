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
              <Link to='/componentes' > Cadastro de Componentes </Link>
              <Link to='/regras' > Cadastro de Regras </Link>
              <Link to='/usuarios' > Cadastro de Usuários </Link>
              <Link to='/vidroproduto' > Cadastro de Vidros por produto</Link>
              <Link to='/componenteproduto' > Cadastro de Componente por produto </Link>
              <Link to='/estoque' > Cadastro de Estoque </Link>
              <Link to='/cliente' > Cadastro de Cliente </Link>
              <Link to='/vidro' > Cadastro de Vidro </Link>
              <Link to='/projeto' > Cadastro de Projeto </Link>
              
            </div>
        </div>  
    </div>
  )
}