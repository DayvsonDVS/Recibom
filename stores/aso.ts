import { defineStore } from 'pinia'
import { useRequest } from '@/composables/useRequest'
import {
  Aso,
  responsibleASO,
  queryPayload,
  queryPayloadResponsible
} from '@/models/Aso'

export const useASO = defineStore('aso', {
  state: () => ({
    asos: [] as Aso[],
    allASOs: [] as Aso[],
    auxASOs: [] as Aso[],
    responsible: [] as responsibleASO[],
    auxResponsible: [] as responsibleASO[]
  }),

  getters: {
    getASOs: (state) => {
      if (state.asos.length > 0) {
        return state.asos
      } else {
        return state.allASOs
      }
    }
  },

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
    },

    async fetchResponsibleASO(payload: queryPayloadResponsible) {
      this.responsible = JSON.parse(
        await useRequest(
          `/exportadados?parametro={"empresa":${payload.empresa},"codigo":${payload.codigo},"chave":${payload.chave},"tipoSaida":${payload.tipoSaida},"sequencial":"${payload.sequencial}"}`,
          {
            method: 'get'
          }
        )
      )

      this.asos.map((aso) => {
        const object = this.searchIDSequential(this.responsible, aso.IDFICHA)

        aso.CPFRESP = object?.cpfResp!
        aso.NOMERESPONSAVEL = object?.nomeResponsavel!
        aso.NRCONSCLASSE = object?.nrConsClasse!
        aso.UFCONSCLASSE = object?.ufConsClasse!
      })
    },

    async fetchAllResponsibleASO(payload: queryPayloadResponsible) {
      this.auxResponsible = JSON.parse(
        await useRequest(
          `/exportadados?parametro={"empresa":${payload.empresa},"codigo":${payload.codigo},"chave":${payload.chave},"tipoSaida":${payload.tipoSaida},"sequencial":"${payload.sequencial}"}`,
          {
            method: 'get'
          }
        )
      )

      this.responsible.push(...this.auxResponsible)

      await this.addResponsible()
    },

    async addResponsible() {
      this.allASOs.map((aso) => {
        const object = this.searchIDSequential(this.responsible, aso.IDFICHA)

        aso.CPFRESP = object?.cpfResp!
        aso.NOMERESPONSAVEL = object?.nomeResponsavel!
        aso.NRCONSCLASSE = object?.nrConsClasse!
        aso.UFCONSCLASSE = object?.ufConsClasse!
      })
    },

    searchIDSequential(
      list: responsibleASO[],
      targetValue: string
    ): responsibleASO | null {
      const foundItem = list.find(({ sequencial }) =>
        sequencial.includes(targetValue)
      )
      if (foundItem) {
        return foundItem
      } else {
        return null
      }
    }
  }
})
