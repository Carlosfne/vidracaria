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
import imagemBackground from '../../images/backgroundDolar.png';

import './style.css';

const useStyles = makeStyles({
    table: {
      width: 650,
    },
  });


export default function Vidro() {

    const [ produtos, setProdutos ] = useState([])

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
                            {item.nome}
                        </div>
                        <div className="quantidade">
                            <img src={item.imagem} alt=""/>
                            {/* {`${item.precoPorMetroQuadrado} m²`} */}
                        </div>
                    </div>
                    <div className="item-lista-acoes">
                        <button type="" title="Adicionar Estoque">
                            <FontAwesomeIcon icon={faPlus} color="#a8ffe5" style={{marginRight: '2px'}}/>
                            <FontAwesomeIcon icon={faBox} color="#a8ffe5"/>
                        </button>
                        <DialogMotorista />
                        <TemporaryDrawer />
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


    function DialogMotorista(marca) {
        const id = marca.value;
        const [open, setOpen] = React.useState(false);
        const [ marcain , setMarcaIn ] = React.useState([]);

        const handleClickOpen = () => {
          setOpen(true);
          loadStep()
      };
          async function loadStep(){
              const response = await api.get(`/service/motorista/id?id=${id}`)
              setMarcaIn(response.data[0])
          }

        async function DeleteMarca(){
            api.delete(`/service/motorista/id?id=${id}`)
            .then( response=> {
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
                  <DialogTitle id="alert-dialog-title"> <p> Excluir Motorista? </p></DialogTitle>
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
        const [ codigo, setCodigo ] = useState('')
        const [ margem, setMargem ] = useState('')
        const [ perda, setPerda ] = useState('')

        async function handleSubmit(e){
        
            e.preventDefault();
      
            console.log(nome)
            console.log(imagem)
    
            var formData = new FormData();
            // formData.append('id', id)
            formData.append('nome', document.getElementById('nome').value)
            formData.append('imagem', imagem)
            formData.append('codigo', codigo)
            formData.append('margemDeErro', margem)
            formData.append('porcentagemDePerda', perda)
            api.post('produto/criar/',formData)
            .then(response => {
                console.log('RESPOSTA',response)
                loadProdutos()
            })
            .catch(error => console.log(error.response))
        }
        return (
            <div className="form-cadastro">
                <h2>Cadastrar Vidro</h2>
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
                        <label htmlFor="" className="form-label" >Código</label>
                        <input type="text" className="form-input" id='codigo' onChange={e=> setCodigo(e.target.value)}/>
                    </div>
                    <div className="form-campo">
                        <label htmlFor="" className="form-label" >Margem de Erro</label>
                        <input type="text" className="form-input" id='margemDeErro' onChange={e=> setMargem(e.target.value)}/>
                    </div>
                    <div className="form-campo">
                        <label htmlFor="" className="form-label" >% Perda</label>
                        <input type="text" className="form-input" id='porcentagemDePerda' onChange={e=> setPerda(e.target.value)}/>
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
        api.post('produto/detalhe/')
        .then(response => {
            console.log(response.data)
            setProdutos(response.data.produtos)
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
                    <h2>Lista de Vidros</h2>

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