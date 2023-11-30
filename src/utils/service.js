const url = 'https://api-clientes-mjz1.onrender.com/'
import axios from 'axios'

export const service = () => {
    
}

export const get = (param) => {
    return axios.get(`${url}${param}`)
}

export const deleteItem = (id) => {
    return axios.delete(`${url}proveedores/${id}`)
}   

export const put = (id, body) => {
    return axios.put( `${url}proveedores/${id}`, body )
}

export const post = (body) => {
    return axios.post( `${url}proveedores/add`, body )
}


