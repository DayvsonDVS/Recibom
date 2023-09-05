<template>
  <div class="aso-exame-table">
    <Table
      :columns="[
        'tipo_ex',
        'data_ex',
        'procedimento_ex',
        'obs_ex',
        'ordem_ex',
        'resultado_ex',
        'cpf_ex',
        'cnpj_ex',
        'cpf_resp_ex',
        'coordenador_resp_ex',
        'crm_resp_ex',
        'uf_resp_ex',
        'data_aso2',
        'status'
      ]"
      striped
    >
      <Row
        v-for="{
          TPEXAMEOCUP,
          DTEXAME,
          PROCREALIZADO,
          DESCRICAOEXAME,
          ORDEMEXAME,
          RESASOSOC,
          CPFTRAB,
          NRINSCEMPRESA,
          CPFRESP,
          NOMERESPONSAVEL,
          NRCONSCLASSE,
          UFCONSCLASSE,
          DTASO,
          STATUS
        } in ASO.getASOs"
        :class="!DTEXAME ? 'error' : ''"
      >
        <Column>{{ TPEXAMEOCUP }} </Column>
        <Column>{{ DTEXAME }} </Column>
        <Column>{{ PROCREALIZADO }} </Column>
        <Column>{{ DESCRICAOEXAME }} </Column>
        <Column>{{ ORDEMEXAME }} </Column>
        <Column>{{ RESASOSOC }} </Column>
        <Column>{{ CPFTRAB }} </Column>
        <Column>{{ NRINSCEMPRESA }} </Column>
        <Column>{{ CPFRESP }} </Column>
        <Column>{{ NOMERESPONSAVEL }} </Column>
        <Column>{{ NRCONSCLASSE }} </Column>
        <Column>{{ UFCONSCLASSE }} </Column>
        <Column>{{ DTASO }} </Column>
        <Column>{{ STATUS }} </Column>
      </Row>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { Table, Row, Column } from 'bumi-components-new'
import { useASO } from '@/stores/aso'

const ASO = useASO()
</script>

<style lang="scss" scoped>
.aso-exame-table {
  :deep(tr) {
    &.error {
      color: red;
    }
  }
}
</style>
