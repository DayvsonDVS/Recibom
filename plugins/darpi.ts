import { configure } from '@cataline.io/darpi'

export default defineNuxtPlugin(() => {
  configure({
    locale: 'ptBR',
    theme: 'dark',
    messages: {
      mixed: {
        required: 'Campo obrigatório'
      }
    }
  })
})
