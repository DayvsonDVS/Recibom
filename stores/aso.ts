import { defineStore } from 'pinia'
import { useRequest } from '@/composables/useRequest'
import { Aso, queryPayload } from '@/models/Aso'

export const useASO = defineStore('aso', {
  state: () => ({
    asos: [] as Aso[],
    allASOs: [] as Aso[],
    auxASOs: [] as Aso[]
  }),
  actions: {
    async fetchASOs(payload: queryPayload) {
      this.asos = JSON.parse(
        await useRequest(
          `/exportadados?parametro={"empresa":${payload.empresa},"codigo":${payload.codigo},"chave":${payload.chave},"tipoSaida":${payload.tipoSaida},"funcionarioInicio":${payload.funcionarioInicio},"funcionarioFim":${payload.funcionarioFim},"pFuncionario":${payload.pFuncionario},"funcionario":${payload.funcionario},"dataInicio":"${payload.dataInicio}","dataFim":"${payload.dataFim}","pDataIncAso":${payload.pDataIncAso},"tpExame":"${payload.tpExame}"}`,
          {
            method: 'get'
          }
        )
      ) as Aso[]
    },
    async fetchAllASOs(payload: queryPayload) {
      this.auxASOs = JSON.parse(
        await useRequest(
          `/exportadados?parametro={"empresa":${payload.empresa},"codigo":${payload.codigo},"chave":${payload.chave},"tipoSaida":${payload.tipoSaida},"funcionarioInicio":${payload.funcionarioInicio},"funcionarioFim":${payload.funcionarioFim},"pFuncionario":${payload.pFuncionario},"funcionario":${payload.funcionario},"dataInicio":"${payload.dataInicio}","dataFim":"${payload.dataFim}","pDataIncAso":${payload.pDataIncAso},"tpExame":"${payload.tpExame}"}`,
          {
            method: 'get'
          }
        )
      ) as Aso[]
      this.allASOs.push(...this.auxASOs)
      console.log(this.allASOs)
    }
  }
})
