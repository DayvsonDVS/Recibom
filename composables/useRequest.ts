import { $fetch } from 'ohmyfetch'

export const useRequest = $fetch.create({
  baseURL: `https://cors-anywhere-2okrk.ondigitalocean.app/https://ws1.soc.com.br/WebSoc`,

  async onResponseError({ response }) {
    console.log(response)
  }
})
