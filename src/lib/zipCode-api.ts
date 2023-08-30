import axios from 'axios'

export const apiZipCode = axios.create({
  baseURL: 'https://viacep.com.br/ws',
})
