import axios from 'axios'

export const zipCode = axios.create({
  baseURL: 'https://viacep.com.br/ws',
})
