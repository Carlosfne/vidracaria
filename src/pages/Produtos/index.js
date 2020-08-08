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
import Modal from '@material-ui/core/Modal';
import imagemBackground from '../../images/backgroundDolar.png';

import './style.css';

const useStyles = makeStyles(theme => ({
    table: {
      width: 650,
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
  }));

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

export default function Produtos() {

    const [ produtos, setProdutos ] = useState([])

    function SimpleModal() {
        const classes = useStyles();
        // getModalStyle is not a pure function, we roll the style only on the first render
        const [modalStyle] = React.useState(getModalStyle);
        const [open, setOpen] = React.useState(false);
      
        const handleOpen = () => {
          setOpen(true);
        };
      
        const handleClose = () => {
          setOpen(false);
        };
      
        return (
          <div>
            <p>Click to get the full Modal experience!</p>
            <button type="button" onClick={handleOpen}>
              Open Modal
            </button>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={open}
              onClose={handleClose}
            >
              <div style={modalStyle} className={classes.paper}>
                <h2 id="simple-modal-title">Text in a modal</h2>
                <p id="simple-modal-description">
                  Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </p>
                <SimpleModal />
              </div>
            </Modal>
          </div>
        );
      }

    function TemporaryDrawer(marca) {
        const id = marca.value
        const classes = useStyles();
        const [state, setState] = useState({
            top: false,
            left: false,
            bottom: false,
            right: false,
        });
        const [ step, setStep ] = useState([]);

      async function loadStep(){
          var formData = new FormData()
          formData.append('id', id)
          const response = await api.get(`/produto/detalhe/`, formData)

          setStep(response.data.produtos)
      }
          useEffect(() => {
            loadStep()
          },[])
        
          function valida_form (){
            if(document.getElementById("nome").value.length <=0){
            document.getElementById("nome").focus();
            document.getElementById("nome").style.borderStyle = "solid";
            document.getElementById("nome").style.borderWidth = "1px";
            document.getElementById("nome").style.borderColor = "orange";
            // return toast.error(`Campo Nome é obrigatório`)
            }
            if(document.getElementById("cnpj").value.length <=0){
            document.getElementById("cnpj").focus();
            document.getElementById("cnpj").style.borderStyle = "solid";
            document.getElementById("cnpj").style.borderWidth = "1px";
            document.getElementById("cnpj").style.borderColor = "orange";
            // return toast.error(`Campo CNPJ é obrigatório`)
            }
        } 
         
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
              <div>
                  <h1>Editar Produto</h1>
                  <form onSubmit={handleSubmit} className='form-editar'>
                        <label id='labeleditValue-usuario' htmlFor="">Produto</label>
                        <input
                        className='input-form-editar'
                        maxLength='40'
                        defaultValue={ step.nome }
                        id='nome'
                        autoFocus
                        />
                        <label id='labeleditValue-usuario' htmlFor="">Código</label>
                        <input
                        defaultValue={ step.codigo }
                        id='codigo'
                        className='input-form-editar'
                        />
                        {/* Informações de endereço */}
                        <label id='labeleditValue-usuario' htmlFor="">Margem de Erro</label>
                        <input
                        id='margem'
                        className='input-form-editar'
                        maxLength='20'
                        defaultValue={ step.margemDeErro }
                        />
                        {/* <label id='labeleditValue-usuario' htmlFor="">Bairro</label>
                        <input
                        id='email2'
                        className='input-form-editar'
                        maxLength='20'
                        defaultValue={ dados.endereco }
                        /> */}
                        <label id='labeleditValue-usuario' htmlFor="">% de Perda</label>
                        <input
                        id='email2'
                        className='input-form-editar'
                        maxLength='20'
                        defaultValue={ step.porcentagemDePerda }
                        />
                        <label id='labeleditValue-usuario' htmlFor="">Imagem</label>
                        <input
                        id='email2'
                        className='input-form-editar'
                        maxLength='20'
                        defaultValue={ step.imagem }
                        />
                        <label id='labeleditValue-usuario' htmlFor="">Status</label>
                        <input
                        id='email2'
                        className='input-form-editar'
                        maxLength='20'
                        defaultValue={ step.status }
                        />
                        {/* fim das informações de contato */}
                        
                        <button  className='general-button-salvar' onClick={valida_form} >Salvar</button>
                      </form>
              </div>
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
            //   onClick={toggleDrawer(side, false)}
            //   onKeyDown={toggleDrawer(side, false)}
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
                            {/* <img src={item.imagem} alt=""/> */}
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
                        {/* <SimpleModal value={item.id} /> */}
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
                            <strong>Código: </strong>
                            <span>{item.codigo}</span>
                        </div>
                        <div className="campos">
                            <strong>Margem de Erro: </strong>
                            <span>{item.margemDeErro}</span>
                        </div>
                        <div className="campos">
                            <strong>% de Perda: </strong>
                            <span>{item.porcentagemDePerda}</span>
                        </div>
                        <div className="campos">
                            <strong>Imagem: </strong>
                            {/* <span>{item.imagem}</span> */}
                            <img src={item.imagem} alt={item.nome}/>
                        </div>
                        {/* <div className="campos">
                            <strong>Valor de Venda: </strong>
                            <span>{item.precoPorMetroQuadrado} m²</span>
                        </div>
                        <div className="campos">
                            <strong>Preço do Estoque: </strong>
                            <span>{item.valorCompra * item.estoque}</span>
                        </div> */}
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
            const response = await api.post(`/produto/detalhe/`, formData)
            setMarcaIn(response.data.produtos)
            console.log(response.data.produtos)
        }

        async function DeleteMarca(){
            var formData = new FormData();
            formData.append('id', id)
            api.post(`/produto/remover/`,formData)
            .then( response=> {
                console.log(response.data)
                loadProdutos()
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
                  <DialogTitle id="alert-dialog-title"> <p> Excluir Produto? </p></DialogTitle>
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
                <h2>Cadastrar Produto</h2>
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
                    <h2>Lista de Produtos</h2>

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