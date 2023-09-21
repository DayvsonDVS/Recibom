import axios from 'axios'

export const useAxios = axios.create({
  baseURL: `https://cors-anywhere-2okrk.ondigitalocean.app/https://ws1.soc.com.br/WebSoc`,

  responseEncoding: 'utf8'
})
