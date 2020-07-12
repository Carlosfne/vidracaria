import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import { faTrash, faPencilAlt, faPlus, faBox } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Formulario from '../../components/Formulario';
import Cabecalho from '../../components/Cabecalho';
import Lista from '../../components/Lista';

import imagemBackground from '../../images/backgroundDolar.png';

import './style.css';

function ItemLista({item}) {
    
    const [detalhes, setDetalhes] = useState(false);

    return (
        <div 
            className="corpo-item-lista"
            style={detalhes ? {maxHeight: "none"} : {maxHeight: "55px"}}
        >
            <div 
                className="item-lista" 
                // title="Clique para ver os detalhes"
                // onClick={() => setDetalhes(!detalhes)}                
            >
                <div className="item-lista-id">{item.id}</div>
                <div className="item-lista-dados-principais">
                    <div className="nome">
                        {item.nome}
                    </div>
                    <div className="quantidade">
                        {`${item.dataCriacao}`}
                    </div>
                </div>
                <div className="item-lista-acoes">
                    {/* <button type="" title="Adicionar Estoque">
                        <FontAwesomeIcon icon={faPlus} color="#a8ffe5" style={{marginRight: '2px'}}/>
                        <FontAwesomeIcon icon={faBox} color="#a8ffe5"/>
                    </button> */}
                    <button type="" title="Excluir Usuário">
                        <FontAwesomeIcon icon={faTrash} color="#fa9588"/>
                    </button>
                    <button type="" title="Editar Usuário">
                        <FontAwesomeIcon icon={faPencilAlt} color="#DDD" />
                    </button>
                </div>
            </div>

        </div>
    );
}

export default function Usuarios() {

    const [ produtos, setProdutos ] = useState([])

    

    function Formulario() {
        const [ nome, setNome ] = useState('')
        const [ senha, setSenha ] = useState('')

        async function handleSubmit(e){
        
            e.preventDefault();
    
            var formData = new FormData();
            // formData.append('id', id)
            formData.append('nome', document.getElementById('nome').value)
            formData.append('senha', senha)
            formData.append('hierarquia', 1)

            api.post('usuario/criar/',formData)
            .then(response => {
                console.log('RESPOSTA',response)
                loadProdutos()
            })
            .catch(error => console.log(error.response))
        }
        return (
            <div className="form-cadastro">
                <h2>Cadastrar Usuário</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-campo">
                        <label htmlFor="" className="form-label" >Nome</label>
                        <input type="text" className="form-input" id='nome' onChange={e=> setNome(e.target.value)} autoComplete="off"/>
                    </div>
                    <div className="form-campo">
                        <label htmlFor="" className="form-label" >Senha</label>
                        <input type="password" className="form-input" id='nome' onChange={e=> setSenha(e.target.value)}/>
                    </div>                 
    
                    <div>
                        <button type="submit" className="btn btn-confirma">Salvar</button>
                        {/* <button className="btn btn-limpar">Limpar</button> */}
                    </div>
                </form>
            </div>
        );
    }


    function loadProdutos(){
        api.get('usuario/listaUsuarios/')
        .then(response => {
            console.log(response.data)
            setProdutos(response.data.all_Users)
        })
        .catch(error => console.log(error.response))
    }
    useEffect(() => {
        loadProdutos()
    }, [])

    return (
        <div 
            className="home-produtos"
            // style={{backgroundImage: `url(${imagemBackground})`, backgroundSize: 'contain'}}
        >
            <Cabecalho />
            <div className="home-produtos-corpo">
                <Formulario /> 
                <div className="lista">
                    <h2>Lista de Usuários</h2>

                    <div className="lista-busca">
                        <form>
                            <input type="text" value="" placeholder="Pesquise aqui..." className="form-input"/>
                            <button type="submit" className="btn btn-confirma">Buscar</button>
                        </form>
                    </div>
                    <div className="corpo-lista">
                        {produtos.map((item, indice) => (
                            <ItemLista item={item} key={indice}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}