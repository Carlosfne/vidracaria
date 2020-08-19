import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import { faTrash, faPencilAlt, faPlus, faBox } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Formulario from '../../components/Formulario';
import Cabecalho from '../../components/Cabecalho';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import './style.css';



export default function Componentes() {

    const [ produtos, setProdutos ] = useState([])
    const [ estoques, setEstoques ] = useState([])

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
                            {`${item.recuo} recuo`}
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
                            <span>{item.nome}</span>
                        </div>
                        <div className="campos">
                            <strong>Imagem: </strong>
                            <span>{item.imagem}</span>
                        </div>
                        <div className="campos">
                            <strong>Recuo: </strong>
                            <span>{item.recuo}</span>
                        </div>
                        <div className="campos">
                            <strong>Estoque: </strong>
                            <span>{item.idEstoque}</span>
                        </div>
                    </div>
                }
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
            const response = await api.post(`/componente/detalhe/`, formData)
            setMarcaIn(response.data.componentes)
            console.log(response.data.componentes)
        }

        async function DeleteMarca(){
            var formData = new FormData();
            formData.append('id', id)
            api.post(`/componente/remover/`,formData)
            .then( response=> {
                console.log(response.data)
                loadProdutos()
                toast.error('Registro excluido com sucesso!')
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
                  <DialogTitle id="alert-dialog-title"> <p>Excluir Componente?</p></DialogTitle>
                  <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                      <h3>{marcain.nome}</h3>
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

    function Formulario() {
        const [ nome, setNome ] = useState('')
        const [ imagem, setImagem ] = useState('')
        const [ recuo, setRecuo ] = useState('')
        const [ estoque, setEstoque ] = useState('')

        async function handleSubmit(e){
        
            e.preventDefault();
    
            var formData = new FormData();
            // formData.append('id', id)
            formData.append('nome', document.getElementById('nome').value)
            formData.append('imagem', imagem)
            formData.append('recuo', recuo)
            formData.append('idEstoque', document.getElementById('estoque').value)
            api.post('componente/criar/',formData)
            .then(response => {
                console.log('RESPOSTA',response)
                toast.info(`Componente ${response.data.nome} salvo com sucesso!`)   
                loadProdutos()
            })
            .catch(error => console.log(error.response))
        }
        return (
            <div className="form-cadastro">
                <h2>Cadastrar Componente</h2>
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
                        <label htmlFor="" className="form-label" >Recuo</label>
                        <input type="text" className="form-input" id='recuo' onChange={e=> setRecuo(e.target.value)}/>
                    </div>

                    <div className="form-campo">
                        <label htmlFor="" className="form-label" >Estoque</label>
                        <select className="form-input select" id='estoque' onChange={e=> setEstoque(e.target.value)}> 
                            {
                                estoques.map(estoque => (
                                <option value={estoque.id} >{estoque.descricao}</option>
                                ))
                            }
                        </select>
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
        api.post('componente/detalhe/')
        .then(response => {
            console.log(response.data)
            setProdutos(response.data.componentes)
        })
        .catch(error => console.log(error.response))
    }
    function loadEstoques(){
        api.post('estoque/detalhe/')
        .then(response => setEstoques(response.data.estoque))
        .catch(error => console.log(error.response))
    }

    useEffect(() => {
        loadProdutos()
        loadEstoques()
    }, [])

    return (
        <div 
            className="home-produtos"

        >
            <Cabecalho />
            <div className="home-produtos-corpo">
                <Formulario /> 
                <div className="lista">
                    <h2>Lista de Componentes</h2>

                    <div className="lista-busca">
                        <form>
                            <input type="text" value="" placeholder="Pesquise aqui..." className="form-input"/>
                            <button type="submit" className="btn btn-confirma">Buscar</button>
                        </form>
                    </div>
                    <div className="corpo-lista">
                        {!produtos ?(
                            <>
                                <h6>Ainda não temos itens cadastrados :(</h6>
                                <h6>Cadastre uma nova regra no formulário ao lado.</h6>
                            </>
                        ):
                        produtos.map((item, indice) => (
                            <ItemLista item={item} key={indice}/>
                        ))}
                    </div>
                </div>
            <ToastContainer /> 
            </div>
        </div>
    )
}