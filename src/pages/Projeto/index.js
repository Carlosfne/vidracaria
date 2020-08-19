import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import { faTrash, faPencilAlt, faPlus, faBox } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cabecalho from '../../components/Cabecalho';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Drawer from '@material-ui/core/Drawer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

import './style.css';

const useStyles = makeStyles({
    table: {
      width: 650,
    },
  });


export default function Projeto() {

    const [ produtos, setProdutos ] = useState([])
    const [ produto, setProduto ] = useState([])
    const [ clientes, setClientes ] = useState([])

    function TemporaryDrawer(marca) {
        const id = marca.value
        const classes = useStyles();
        const [state, setState] = React.useState({
            top: false,
            left: false,
            bottom: false,
            right: false,
        });
        const [ step, setStep ] = useState([]);

      async function loadStep(){
          const response = await api.get(`/service/motorista/id?id=${id}`)

          setStep(response.data)
      }
          useEffect(() => {
            loadStep()
          }, [])

        async function UpdateTipo(data){

          var descricao = data.descricao
          var result = {
              "id":id,
              descricao,
          }
          console.log(result)
          await api.put('/service/motorista', result)
          .then(response =>{
              console.log(response)
            // toggleDrawer('right', false)

          })
        //   .catch(error => toast.info("Não é possível alterar motorista, descrição já cadastrada!"))
        }


        function FormTipo({ onSubmit }) {

          const [ descricao, setDescricao] =useState('')

          async function handleSubmit(e){
              e.preventDefault();

              await onSubmit({
                  descricao,
              });

              setDescricao('')

            }

          return (
              <h1>Carlos</h1>
          )
      }

        const toggleDrawer = (side, open) => event => {
          if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
              return;
          }
          setState({ ...state, [side]: open });
        };

        const sideList = side => (
            <>
            <FormTipo
              className={classes.table}
              onClick={toggleDrawer(side, false)}
              onKeyDown={toggleDrawer(side, false)}
              role="presentation"
              onSubmit={UpdateTipo} />

          </>
        );

        return (
          <div>
            <button type="" title="Editar Produto" onClick={toggleDrawer('right', true)}>
                <FontAwesomeIcon icon={faPencilAlt} color="#000" />
            </button>

            <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
              {sideList('right')}
            </Drawer>
          </div>
        );
    }

    
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
                            {item.id}
                        </div>
                        <div className="quantidade">
                            <img src={item.imagem} alt=""/>
                            {/* {`${item.precoPorMetroQuadrado} m²`} */}
                        </div>
                    </div>
                    <div className="item-lista-acoes">
                        {/* <button type="" title="Adicionar Estoque">
                            <FontAwesomeIcon icon={faPlus} color="#a8ffe5" style={{marginRight: '2px'}}/>
                            <FontAwesomeIcon icon={faBox} color="#a8ffe5"/>
                        </button> */}
                        <DialogMotorista value={item.id} />
                        {/* <TemporaryDrawer /> */}
                    </div>
                </div>

                {
                    detalhes && 
                    <div className="item-detalhes">
                        <div className="campos">
                            <strong>ID: </strong>
                            <span>{item.id}</span>
                        </div>
                        <div className="campos">
                            <strong>Comprimento vão: </strong>
                            <span>{item.comprimentoVao}</span>
                        </div>
                        <div className="campos">
                            <strong>Altura vão: </strong>
                            <span>{item.alturaVao}</span>
                        </div>
                        <div className="campos">
                            <strong>Largura vão: </strong>
                            <span>{item.larguraVao}</span>
                        </div>                        
                    </div>
                }
            </div>
        );
    }


    function DialogMotorista(marca) {
        const id = marca.value;
        const [open, setOpen] = React.useState(false);
        const [ marcain , setMarcaIn ] = React.useState([]);

        const handleClickOpen = () => {
          setOpen(true);
          loadStep()
      };
          async function loadStep(){
            var formData = new FormData()
            formData.append('id', id)
              const response = await api.post(`/projetos/detalhe/`, formData)
              setMarcaIn(response.data[0])
          }

        async function DeleteMarca(){
            var formData = new FormData()
            formData.append('id', id)
            api.post(`/projetos/remover/`, formData)
            .then( response=> {
                toast.error('Registro excluido com sucesso!')
                loadProdutos()
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
                  <DialogTitle id="alert-dialog-title"> <p> Excluir Motorista? </p></DialogTitle>
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

    function Formulario() {
        const [ cliente, setCliente ] = useState('')
        const [ produtoID, setProdutoID ] = useState('')
        const [ comprimento, setComprimento ] = useState('')
        const [ altura, setAltura ] = useState('')
        const [ largura, setLargura ] = useState('')

        async function handleSubmit(e){
        
            e.preventDefault();      
    
            var formData = new FormData();
            // formData.append('id', id)
            formData.append('idCliente', document.getElementById('cliente').value)
            formData.append('idProduto', document.getElementById('produto').value)
            formData.append('comprimentoVao', comprimento)
            formData.append('alturaVao', altura)
            formData.append('larguraVao', largura)
            api.post('projetos/criar/',formData)
            .then(response => {
                console.log('RESPOSTA',response)
                loadProdutos()
                toast.info(`Projeto salvo com sucesso!`) 
            })
            .catch(error => console.log(error.response))
        }
        return (
            <div className="form-cadastro">
                <h2>Cadastrar Projeto</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-campo">
                        <label htmlFor="" className="form-label" >Cliente</label>
                        <select className="form-input select" id='cliente' onChange={e=> setCliente(e.target.value)}>
                            {
                                clientes.map(cliente =>(
                                    <option key={cliente.id} value={cliente.id}>
                                        {cliente.nome}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-campo">
                        <label htmlFor="" className="form-label" >Produto</label>
                        <select className="form-input select" id='produto' onChange={e=> setProdutoID(e.target.value)}>
                            {
                                produto.map(produto =>(
                                    <option key={produto.id} value={produto.id}>
                                        {produto.nome}
                                    </option>
                                ))
                            }
                        </select>
                    </div>                    
                    <div className="form-campo">
                        <label htmlFor="" className="form-label" >Comprimento Vão</label>
                        <input type="text" className="form-input" id='comprimento' onChange={e=> setComprimento(e.target.value)}/>
                    </div>
                    <div className="form-campo">
                        <label htmlFor="" className="form-label" >Altura Vão</label>
                        <input type="text" className="form-input" id='altura' onChange={e=> setAltura(e.target.value)}/>
                    </div>
                    <div className="form-campo">
                        <label htmlFor="" className="form-label" >Largura vão</label>
                        <input type="text" className="form-input" id='largura' onChange={e=> setLargura(e.target.value)}/>
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
        api.post('projetos/detalhe/')
        .then(response => {
            console.log(response.data)
            setProdutos(response.data.projetos)
        })
        .catch(error => console.log(error.response))
    }

    function loadCliente(){
        api.post('cliente/detalhe/')
        .then(response => {
            console.log(response.data)
            setClientes(response.data.clientes)
        })
        .catch(error => console.log(error.response))
    }
    function loadProduto(){
        api.post('produto/detalhe/')
        .then(response => {
            console.log(response.data)
            setProduto(response.data.produtos)
        })
        .catch(error => console.log(error.response))
    }
    useEffect(() => {
        loadProdutos()
        loadCliente()
        loadProduto()
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
                    <h2>Lista de Projetos</h2>

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
                <ToastContainer /> 
            </div>
        </div>
    )
}
