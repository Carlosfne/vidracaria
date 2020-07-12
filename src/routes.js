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
            </Switch>
        </BrowserRouter>
    )
}