import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import { faTrash, faPencilAlt, faPlus, faBox } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cabecalho from '../../components/Cabecalho';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './style.css';


export default function Regras() {
    
    const [ regras, setRegras ] = useState([])
    const [ subs, setSubs ] = useState([])
    
    function ItemLista({item}) {
        console.log('ITEM', item)
        var idSub = item.subProduto
        var formData = new FormData();
            formData.append('id', item.subProduto)
            console.log(formData)
        api.post(`subproduto/detalhe/`,formData)
        .then(response => {
            console.log('SUUBBB->', response.data)
            setSubdetalhe(response.data.subprodutos)
        })
        .catch(error => console.log(error.response))
    
        const [ subdetalhe, setSubdetalhe ] = useState([])
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
                            {subdetalhe.nome}
                        </div>
                        <div className="quantidade">
                            {`${item.ajusteAltura} ajuste altura`}
                        </div>
                    </div>
                    <div className="item-lista-acoes">
                        {/* <button type="" title="Adicionar Estoque">
                            <FontAwesomeIcon icon={faPlus} color="#a8ffe5" style={{marginRight: '2px'}}/>
                            <FontAwesomeIcon icon={faBox} color="#a8ffe5"/>
                        </button> */}
                        <button type="" title="Excluir Produto">
                            {/* <FontAwesomeIcon icon={faTrash} color="#fa9588"/> */}
                            <DialogMotorista value={item.id} />
                            
                        </button>
                        {/* <button type="" title="Editar Produto">
                            <FontAwesomeIcon icon={faPencilAlt} color="#DDD" />
                        </button> */}
                    </div>
                </div>
    
                {
                    detalhes && 
                    <div className="item-detalhes">
                        <div className="campos">
                            <strong>Descrição: </strong>
                            <span>{subdetalhe.nome}</span>
                        </div>
                        <div className="campos">
                            <strong>Ajuste altura: </strong>
                            <span>{item.ajusteAltura}</span>
                        </div>
                        <div className="campos">
                            <strong>Ajuste Comprimento: </strong>
                            <span>{item.ajusteComprimento}</span>
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
    
    function loadSub(){
        api.post('vidro/detalhe/')
        .then(response => {
            console.log(response.data)
            setSubs(response.data.vidro)
        })
    }

    function Formulario() {
        const [ vidro, setVidro ] = useState('')
        const [ ajusteAltura, setAjusteAltura ] = useState('')
        const [ ajusteComprimento, setAjusteComprimento ] = useState('')

        async function handleSubmit(e){
        
            e.preventDefault();
    
            var formData = new FormData();
            // formData.append('id', id)
            formData.append('idVidro', document.getElementById('vidro').value)
            formData.append('ajusteAltura', ajusteAltura)
            formData.append('ajusteComprimento', ajusteComprimento)
            console.log(formData)
            api.post('regra/criar/',formData)
            .then(response => {
                console.log('RESPOSTA',response)
                loadRegras()
            })
            .catch(error => console.log(error.response))
        }
        return (
            <div className="form-cadastro">
                <h2>Cadastrar Regra</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-campo">
                        <label htmlFor="" className="form-label" >Vidro</label>
                        <select type="text" className="form-input select" id='vidro' onChange={e=> setVidro(e.target.value)}>
                            {
                                subs.map(sub=>(
                                    <option key={sub.id} value={sub.id}>{sub.nome}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-campo">
                        <label htmlFor="" className="form-label" >Ajuste Altura</label>
                        <input type="text" className="form-input" id='altura' onChange={e=> setAjusteAltura(e.target.value)}/>
                    </div>
                    <div className="form-campo">
                        <label htmlFor="" className="form-label" >Ajuste Comprimento</label>
                        <input type="text" className="form-input" id='comprimento' onChange={e=> setAjusteComprimento(e.target.value)}/>
                    </div>                    
    
                    <div>
                        <button type="submit" className="btn btn-confirma">Salvar</button>
                        {/* <button className="btn btn-limpar">Limpar</button> */}
                    </div>
                </form>
            </div>
        );
    }

    function DialogMotorista(marca) {
        const id = marca.value;
        console.log(marca)
        const [open, setOpen] = React.useState(false);
        const [ marcain , setMarcaIn ] = React.useState([]);

        const handleClickOpen = () => {
          setOpen(true);
          loadStep()
      };
        async function loadStep(){
            var formData = new FormData()
            formData.append('id', id)
            const response = await api.post(`/regra/detalhe/`, formData)
            setMarcaIn(response.data.componentes)
            console.log(response.data.componentes)
        }

        async function DeleteMarca(){
            var formData = new FormData();
            formData.append('id', id)
            api.post(`/regra/remover/`,formData)
            .then( response=> {
                console.log(response.data)
                loadRegras()
                // toast.info(response.data[0])
                // loadMotoristas()
            })
            .catch(error=> console.log(error))
            setOpen(false);
        }

        const handleClose = () => {
          setOpen(false);
        };

        return (
          <div className='dialog'>
            <button title="Excluir Produto" onClick={handleClickOpen}>
                <FontAwesomeIcon icon={faTrash} color="#fa9588"/>
            </button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"

            >
              <div className='dialog-confirm'>
                  <DialogTitle id="alert-dialog-title"> <p>Excluir Regra?</p></DialogTitle>
                  <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                      {/* <h3>{marcain.nome}</h3> */}
                  </DialogContentText>
                  </DialogContent>
                  <div className='dialog-btns'>
                  <button onClick={handleClose} className='btn-negative'>
                      NÃO
                  </button>
                  <button onClick={DeleteMarca} className='btn-confirm' autoFocus>
                      SIM
                  </button>
                  </div>
              </div>
            </Dialog>
          </div>
        );
    }

    function loadRegras(){
        api.post('regra/detalhe/')
        .then(response => {
            console.log(response.data)
            setRegras(response.data.regras)
        })
        .catch(error => console.log(error.response))
    }
    useEffect(() => {
        loadRegras()
        loadSub()
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
                    <h2>Lista de Regras</h2>

                    <div className="lista-busca">
                        <form>
                            <input type="text" value="" placeholder="Pesquise aqui..." className="form-input"/>
                            <button type="submit" className="btn btn-confirma">Buscar</button>
                        </form>
                    </div>
                    <div className="corpo-lista">
                        {!regras ?(
                            <>
                                <h6>Ainda não temos itens cadastrados :(</h6>
                                <h6>Cadastre uma nova regra no formulário ao lado.</h6>
                            </>
                        ):
                        regras.map((item, indice) => (
                            <ItemLista item={item} key={indice}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
