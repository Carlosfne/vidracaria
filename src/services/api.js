import axios from 'axios';

// Conexão com a url da API
const api_veiculos = axios.create({

    baseURL: 'https://vidracariacfm.herokuapp.com/'

})

export default api_veiculos