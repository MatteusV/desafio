import axios from 'axios'

export const weather = axios.create({
  baseURL: 'https://api.hgbrasil.com/weather',
})
