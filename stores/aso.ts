import { defineStore } from 'pinia'
import { useAxios } from '@/composables/useRequest'
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
    },
    getDistinctASO: (state) => {
      if (state.asos.length > 0) {
        //remove duplicate CPF
        const seen = new Set()
        return state.asos.filter((item) => {
          const value = item.CPFTRAB
          if (!seen.has(value)) {
            seen.add(value)
            return true
          }
          return false
        })
      } else {
        const seen = new Set()
        return state.allASOs.filter((item) => {
          const value = item.CPFTRAB
          if (!seen.has(value)) {
            seen.add(value)
            return true
          }
          return false
        })
      }
    }
  },

  actions: {
    async fetchASOs(payload: queryPayload) {
      // this.asos = JSON.parse(
      //   await useRequest(
      //     `/exportadados?parametro={"empresa":${payload.empresa},"codigo":${payload.codigo},"chave":${payload.chave},"tipoSaida":${payload.tipoSaida},"funcionarioInicio":${payload.funcionarioInicio},"funcionarioFim":${payload.funcionarioFim},"pFuncionario":${payload.pFuncionario},"funcionario":${payload.funcionario},"dataInicio":"${payload.dataInicio}","dataFim":"${payload.dataFim}","pDataIncAso":${payload.pDataIncAso},"tpExame":"${payload.tpExame}"}`,
      //     {
      //       method: 'get'
      //     }
      //   )
      // ) as Aso[]

      const { data } = await useAxios(
        `/exportadados?parametro={"empresa":${payload.empresa},"codigo":${payload.codigo},"chave":${payload.chave},"tipoSaida":${payload.tipoSaida},"funcionarioInicio":${payload.funcionarioInicio},"funcionarioFim":${payload.funcionarioFim},"pFuncionario":${payload.pFuncionario},"funcionario":${payload.funcionario},"dataInicio":"${payload.dataInicio}","dataFim":"${payload.dataFim}","pDataIncAso":${payload.pDataIncAso},"tpExame":"${payload.tpExame}"}`,
        {
          method: 'get'
        }
      )

      this.asos = data
    },

    async fetchAllASOs(payload: queryPayload) {
      const { data } = await useAxios(
        `/exportadados?parametro={"empresa":${payload.empresa},"codigo":${payload.codigo},"chave":${payload.chave},"tipoSaida":${payload.tipoSaida},"funcionarioInicio":${payload.funcionarioInicio},"funcionarioFim":${payload.funcionarioFim},"pFuncionario":${payload.pFuncionario},"funcionario":${payload.funcionario},"dataInicio":"${payload.dataInicio}","dataFim":"${payload.dataFim}","pDataIncAso":${payload.pDataIncAso},"tpExame":"${payload.tpExame}"}`,
        {
          method: 'get'
        }
      )
      this.auxASOs = data

      this.allASOs.push(...this.auxASOs)
    },

    async fetchResponsibleASO(payload: queryPayloadResponsible) {
      const { data } = await useAxios(
        `/exportadados?parametro={"empresa":${payload.empresa},"codigo":${payload.codigo},"chave":${payload.chave},"tipoSaida":${payload.tipoSaida},"sequencial":"${payload.sequencial}"}`,
        {
          method: 'get'
        }
      )

      this.responsible = data

      this.asos.map((aso) => {
        const object = this.searchIDSequential(this.responsible, aso.IDFICHA)

        aso.CPFRESP = object?.cpfResp!
        aso.NOMERESPONSAVEL = object?.nomeResponsavel!
        aso.NRCONSCLASSE = object?.nrConsClasse!
        aso.UFCONSCLASSE = object?.ufConsClasse!
      })
    },

    async fetchAllResponsibleASO(payload: queryPayloadResponsible) {
      const { data } = await useAxios(
        `/exportadados?parametro={"empresa":${payload.empresa},"codigo":${payload.codigo},"chave":${payload.chave},"tipoSaida":${payload.tipoSaida},"sequencial":"${payload.sequencial}"}`,
        {
          method: 'get'
        }
      )

      this.auxResponsible = data

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
