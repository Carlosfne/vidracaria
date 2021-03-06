import React, { useState, useEffect } from 'react';
import { faTrash, faPencilAlt, faPlus, faBox } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cabecalho from '../../components/Cabecalho';
import Lista from '../../components/Lista';
import api from '../../services/api';



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
                title="Clique para ver os detalhes"
                onClick={() => setDetalhes(!detalhes)}                
            >
                <div className="item-lista-id">{item.id}</div>
                <div className="item-lista-dados-principais">
                    <div className="nome">
                        {item.nome}
                    </div>
                    <div className="quantidade">
                        {`${item.precoPorMetroQuadrado} m²`}
                    </div>
                </div>
                <div className="item-lista-acoes">
                    <button type="" title="Adicionar Estoque">
                        <FontAwesomeIcon icon={faPlus} color="#a8ffe5" style={{marginRight: '2px'}}/>
                        <FontAwesomeIcon icon={faBox} color="#a8ffe5"/>
                    </button>
                    <button type="" title="Excluir Produto">
                        <FontAwesomeIcon icon={faTrash} color="#fa9588"/>
                    </button>
                    <button type="" title="Editar Produto">
                        <FontAwesomeIcon icon={faPencilAlt} color="#DDD" />
                    </button>
                </div>
            </div>

            {
                detalhes && 
                <div className="item-detalhes">
                    <div className="campos">
                        <strong>Descrição: </strong>
                        <span>{item.nome}</span>
                    </div>
                    <div className="campos">
                        <strong>Categoria: </strong>
                        <span>{item.categoria}</span>
                    </div>
                    <div className="campos">
                        <strong>Unidade de Medida: </strong>
                        <span>{item.unidadeMedida}</span>
                    </div>
                    <div className="campos">
                        <strong>Estoque: </strong>
                        <span>{item.estoque}</span>
                    </div>
                    <div className="campos">
                        <strong>Valor de Compra: </strong>
                        <span>{item.valorCompra}</span>
                    </div>
                    <div className="campos">
                        <strong>Valor de Venda: </strong>
                        <span>{item.precoPorMetroQuadrado} m²</span>
                    </div>
                    <div className="campos">
                        <strong>Preço do Estoque: </strong>
                        <span>{item.valorCompra * item.estoque}</span>
                    </div>
                    <div className="campos">
                        {/* <strong>Preço do Estoque: </strong>
                        <span>{item.valorCompra * item.estoque}</span> */}
                    </div>
                </div>
            }
        </div>
    );
}



export default function Produtos() {
    const [ subProdutos, setSubProdutos ] = useState([])
    async function adicionaSub(data){
        console.log(data)
    }
    
    function Formulario() {
        const [ nome, setNome ] = useState('')
        const [ imagem, setImagem ] = useState('')
        const [ precoPorMetroQuadrado, setPreco ] = useState('')

        
    
        async function handleSubmit(e){
            e.preventDefault();
      
            console.log(nome)
            console.log(imagem)
            console.log(precoPorMetroQuadrado)
    
            var formData = new FormData();
            // formData.append('id', id)
            formData.append('nome', document.getElementById('nome').value)
            formData.append('imagem', imagem)
            formData.append('precoPorMetroQuadrado', document.getElementById('preco').value)
            api.post('subproduto/criar/',formData)
            .then(response => {
                console.log('RESPOSTA',response)
                loadSub()
            })
            .catch(error => console.log(error.response))
        }
    
        return (
            <div className="form-cadastro">
                <h2>Cadastrar Sub-Produto</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-campo">
                        <label htmlFor="" className="form-label" >Nome</label>
                        <input type="text" className="form-input" id='nome' onChange={e=> setNome(e.target.value)}/>
                    </div>
                    <div className="form-campo">
                        <label htmlFor="" className="form-label" >Imagem</label>
                        <input type="file" className="form-input" id='imagem' onChange={e=> setImagem(e.target.files[0])}/>
                    </div>
    
                    <div className="form-campo">
                        <label htmlFor="" className="form-label" >Preço por m²</label>
                        <input type="text" className="form-input" id='preco' onChange={e=> setPreco(e.target.value)}/>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-confirma">Salvar</button>
                        {/* <button className="btn btn-limpar">Limpar</button> */}
                    </div>
                </form>
            </div>
        );
    }

    function loadSub(){
        api.post('subproduto/detalhe/')
        .then(response => {
            console.log(response.data)
            setSubProdutos(response.data.subprodutos)
        })
        .catch(error => console.log(error.response))
    }
    useEffect(() => {
        loadSub()
    }, [])
    return (
        <div 
            className="home-produtos"
            // style={{backgroundImage: `url(${imagemBackground})`, backgroundSize: 'contain'}}
        >
            <Cabecalho />
            <div className="home-produtos-corpo">
                <Formulario onSubmit={adicionaSub} /> 
                {/* <Lista dados={subProdutos} titulo="Lista de Sub-Produtos"/>                 */}
                <div className="lista">
                    <h2>Lista de Sub-produtos</h2>

                    <div className="lista-busca">
                        <form>
                            <input type="text" value="" placeholder="Pesquise aqui..." className="form-input"/>
                            <button type="submit" className="btn btn-confirma">Buscar</button>
                        </form>
                    </div>
                    <div className="corpo-lista">
                        {subProdutos.map((item, indice) => (
                            <ItemLista item={item} key={indice}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}


const PRODUTOS = [
    {
        id: 1,
        nome: 'Biscoito Trakinas',
        descricao: 'Biscoito recheado de 200gr',
        categoria: 'Alimentos',
        valorCompra: 1.50,
        valorVenda: 2.99,
        unidadeMedida: 'Unidades',
        estoque: 50,
    },
    {
        id: 2,
        nome: 'Biscoito Piraquê',
        descricao: 'Biscoito recheado de 200gr',
        categoria: 'Alimentos',
        valorCompra: 1.50,
        valorVenda: 2.99,
        unidadeMedida: 'Unidades',
        estoque: 44,
    },
    {
        id: 3,
        nome: 'Biscoito Cheetos Requeijão',
        descricao: 'Biscoito recheado de 200gr',
        categoria: 'Alimentos',
        valorCompra: 1.50,
        valorVenda: 2.99,
        unidadeMedida: 'Unidades',
        estoque: 26,
    },
    {
        id: 4,
        nome: 'Biscoito Batata Ruffles',
        descricao: 'Biscoito recheado de 200gr',
        categoria: 'Alimentos',
        valorCompra: 1.50,
        valorVenda: 2.99,
        unidadeMedida: 'Unidades',
        estoque: 13,
    },
];