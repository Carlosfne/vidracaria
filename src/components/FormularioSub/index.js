import React from 'react';

import './style.css';

export default function Formulario() {
    return (
        <div className="form-cadastro">
            <h2>Cadastrar Sub-Produto</h2>
            <form action="">
                <div className="form-campo">
                    <label htmlFor="" className="form-label">Nome</label>
                    <input type="text" className="form-input"/>
                </div>
                <div className="form-campo">
                    <label htmlFor="" className="form-label">Imagem</label>
                    <input type="text" className="form-input"/>
                </div>

                <div className="form-campo">
                    <label htmlFor="" className="form-label">Preço por m²</label>
                    <input type="text" className="form-input"/>
                </div>
                <div>
                    <button type="submit" className="btn btn-confirma">Salvar</button>
                    <button className="btn btn-limpar">Limpar</button>
                </div>
            </form>
        </div>
    );
}