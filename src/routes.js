import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Produtos from './pages/Produtos';
import SubProdutos from './pages/Sub-Produtos';
import Vendas from './pages/Vendas';
import Relatorios from './pages/Relatorios';
import Cadastros from './pages/Cadastros';
import Regras from './pages/Regras';
import Componentes from './pages/Componentes';
import Usuarios from './pages/Usuarios';
import VidrosProduto from './pages/VidrosProduto';
import ComponenteProduto from './pages/ComponenteProduto';
import Estoque from './pages/Estoque';
import Cliente from './pages/Cliente';
import Vidro from './pages/Vidro';
import Projeto from './pages/Projeto'; 

export default function Rotas() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/home" component={Home} />
                <Route path="/produtos" component={Produtos} />
                <Route path="/sub-produtos" component={SubProdutos} />
                <Route path="/vendas" component={Vendas} />
                <Route path='/relatorios' component={Relatorios} />
                <Route path='/cadastro' component={Cadastros} />
                <Route path='/regras' component={Regras} />
                <Route path='/componentes' component={Componentes} />
                <Route path='/usuarios' component={Usuarios} />
                <Route path='/vidroproduto' component={VidrosProduto} />
                <Route path='/componenteproduto' component={ComponenteProduto} />
                <Route path='/estoque' component={Estoque} />
                <Route path='/cliente' component={Cliente} />
                <Route path='/vidro' component={Vidro} />
                <Route path='/projeto' component={Projeto} />
            </Switch>
        </BrowserRouter>
    )
}