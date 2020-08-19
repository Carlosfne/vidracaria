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


export default function Estoque() {

    const [ estoque, setEstoque ] = useState([])

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
                            {item.descricao}
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
                        <DialogMotorista value={item.id}/>
                        {/* <TemporaryDrawer /> */}
                    </div>
                </div>

                {
                    detalhes && 
                    <div className="item-detalhes">
                        <div className="campos">
                            <strong>Descrição: </strong>
                            <span>{item.descricao}</span>
                        </div>
                        <div className="campos">
                            <strong>Quantidade: </strong>
                            <span>{item.quantidade}</span>
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
              const response = await api.post(`/estoque/detalhe/`, formData)
              setMarcaIn(response.data[0])
          }

        async function DeleteMarca(){
            var formData = new FormData()
            formData.append('id', id)
            api.post(`/estoque/remover/`, formData)
            .then( response=> {
                toast.error('Registro excluido com sucesso!')
                loadEstoque()
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
        const [ descricao, setDescricao ] = useState('')
        const [ quantidade, setQuantidade ] = useState('')
        const [ quantidadeMinima, setQuantidadeMinima ] = useState('')
        const [ quantidadeMaxima, setQuantidadeMaxima ] = useState('')
        const [ unidadeMedida, setUnidadeMedida ] = useState('')
        const [ validade, setValidade ] = useState('')
        const [ numeroSerie, setNumeroSerie ] = useState('')
        const [ lote, setLote ] = useState('')
        const [ custo, setCusto ] = useState('')
        const [ fornecedor, setFornecedor ] = useState('')
        

        async function handleSubmit(e){
        
            e.preventDefault();
    
            var formData = new FormData();
            // formData.append('id', id)
            formData.append('descricao', descricao)
            formData.append('quantidade', quantidade)
            formData.append('quantidadeMinima', quantidadeMinima)
            formData.append('quantidadeMaxima', quantidadeMaxima)
            formData.append('unidadeMedida', unidadeMedida)
            formData.append('validade', validade)
            formData.append('numeroSerie', numeroSerie)
            formData.append('lote', lote)
            formData.append('custo', custo)
            formData.append('fornecedor', fornecedor)
            api.post('estoque/criar/',formData)
            .then(response => {
                console.log('RESPOSTA',response)
                loadEstoque()
                toast.info(`Estoque ${response.data.descricao} salvo com sucesso!`)   
            })
            .catch(error => console.log(error.response))
        }
        return (
            <div className="form-cadastro">
                <h2>Cadastrar Estoque</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-campo">
                        <label htmlFor="" className="form-label" >Descricao</label>
                        <input type="text" className="form-input" id='descricao' onChange={e=> setDescricao(e.target.value)} />
                    </div>
                    <div className="form-campo">
                        <label htmlFor="" className="form-label" >Quantidade</label>
                        <input type="text" className="form-input" id='quantidade' onChange={e=> setQuantidade(e.target.value)} />
                    </div>                    
                    <div className="form-campo">
                        <label htmlFor="" className="form-label" >Quantidade Mínima</label>
                        <input type="text" className="form-input" id='quantidadeMinima' onChange={e=> setQuantidadeMinima(e.target.value)} />
                    </div>                    
                    <div className="form-campo">
                        <label htmlFor="" className="form-label" >Quantidade Máxima</label>
                        <input type="text" className="form-input" id='quantidadeMaxima' onChange={e=> setQuantidadeMaxima(e.target.value)} />
                    </div>                    
                    <div className="form-campo">
                        <label htmlFor="" className="form-label" >Unidade Medida</label>
                        <select className="form-input select" id='unidadeMedida' onChange={e=> setUnidadeMedida(e.target.value)} >
                            <option value='m'>Metros</option>
                            <option value='pç'>PÇ</option>
                            <option value='cm'>CM</option>
                            <option value='mm'>mm</option>
                        </select>
                    </div>                    
                    <div className="form-campo">
                        <label htmlFor="" className="form-label" >Validade</label>
                        <input type="date" className="form-input" id='validade' onChange={e=> setValidade(e.target.value)} />
                    </div>                    
                    <div className="form-campo">
                        <label htmlFor="" className="form-label" >Número de Série</label>
                        <input type="text" className="form-input" id='validade' onChange={e=> setNumeroSerie(e.target.value)} />
                    </div>                    
                    <div className="form-campo">
                        <label htmlFor="" className="form-label" >Lote</label>
                        <input type="text" className="form-input" id='validade' onChange={e=> setLote(e.target.value)} />
                    </div>                    
                    <div className="form-campo">
                        <label htmlFor="" className="form-label" >Custo</label>
                        <input type="text" className="form-input" id='validade' onChange={e=> setCusto(e.target.value)} />
                    </div>                    
                    <div className="form-campo">
                        <label htmlFor="" className="form-label" >Fornecedor</label>
                        <input type="text" className="form-input" id='validade' onChange={e=> setFornecedor(e.target.value)} />
                    </div>                    
                    <div>
                        <button type="submit" className="btn btn-confirma">Salvar</button>
                        {/* <button className="btn btn-limpar">Limpar</button> */}
                    </div>
                </form>
            </div>
        );
    }


    function loadEstoque(){
        api.post('estoque/detalhe/')
        .then(response => {
            console.log(response.data)
            setEstoque(response.data.estoque)
        })
        .catch(error => console.log(error.response))
    }
    useEffect(() => {
        loadEstoque()
    }, [])

    return (
        <div 
            className="home-produtos"
        >
            <Cabecalho />
            <div className="home-produtos-corpo">
                <Formulario /> 
                <div className="lista">
                    <h2>Lista de Estoque</h2>

                    <div className="lista-busca">
                        <form>
                            <input type="text" value="" placeholder="Pesquise aqui..." className="form-input"/>
                            <button type="submit" className="btn btn-confirma">Buscar</button>
                        </form>
                    </div>
                    <div className="corpo-lista">
                        {estoque.map((item, indice) => (
                            <ItemLista item={item} key={indice}/>
                        ))}
                    </div>
                </div>
                <ToastContainer /> 
            </div>
        </div>
    )
}