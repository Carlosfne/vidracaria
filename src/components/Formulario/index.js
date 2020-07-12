import React from 'react';

import './style.css';

export default function Formulario() {
    return (
        <div className="form-cadastro">
            <h2>Cadastrar Produto</h2>
            <form action="">
                <div className="form-campo">
                    <label htmlFor="" className="form-label">Nome</label>
                    <input type="text" className="form-input"/>
                </div>
                <div className="form-campo">
                    <label htmlFor="" className="form-label">Descrição</label>
                    <input type="text" className="form-input"/>
                </div>

                <div className="form-campo">
                    <label htmlFor="" className="form-label">Categoria</label>
                    <input type="text" className="form-input"/>
                </div>
                
                <div>
                    <div className="form-campo">
                        <label htmlFor="" className="form-label">Valor Compra</label>
                        <input type="text" className="form-input"/>
                    </div>
                    <div className="form-campo">
                        <label htmlFor="" className="form-label">Valor de Venda</label>
                        <input type="text" className="form-input"/>
                    </div>
                </div>
                
                <div>
                    <div className="form-campo">
                        <label htmlFor="" className="form-label">Unidade de Medida</label>
                        <input type="text" className="form-input"/>
                    </div>
                    <div className="form-campo">
                        <label htmlFor="" className="form-label">Estoque Inicial</label>
                        <input type="text" className="form-input"/>
                    </div>
                </div>

                <div>
                    <button type="submit" className="btn btn-confirma">Salvar</button>
                    <button className="btn btn-limpar">Limpar</button>
                </div>
            </form>
        </div>
    );
}