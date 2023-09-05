<template>
  <div class="aso-table">
    <Table
      :columns="[
        'cpf_aso',
        'cnpj_aso',
        'cpf_resp',
        'coordenador_resp',
        'crm_resp',
        'uf_resp',
        'tipo_aso',
        'data_aso',
        'resultado_aso',
        'cpf_med',
        'nome_med',
        'crm_med',
        'uf_med',
        'status'
      ]"
      striped
    >
      <Row
        v-for="{
          CPFTRAB,
          NRINSCEMPRESA,
          CPFRESP,
          NOMERESPONSAVEL,
          NRCONSCLASSE,
          UFCONSCLASSE,
          TPEXAMEOCUP,
          DTASO,
          RESASO,
          CPFEMISSORASO,
          CPFMEDFICHA,
          NMEMISSORASO,
          NMMEDFICHA,
          NRCRMEMISSORASO,
          NRCRMMEDFICHA,
          UFCRMEMISSORASO,
          UFCRMMEDFICHA,
          STATUS
        } in ASO.getDistinctASO"
        :class="!NMEMISSORASO && !NMMEDFICHA ? 'error' : ''"
      >
        <Column>{{ CPFTRAB }} </Column>
        <Column>{{ NRINSCEMPRESA }} </Column>
        <Column>{{ CPFRESP }} </Column>
        <Column>{{ NOMERESPONSAVEL }} </Column>
        <Column>{{ NRCONSCLASSE }} </Column>
        <Column>{{ UFCONSCLASSE }} </Column>
        <Column>{{ TPEXAMEOCUP }} </Column>
        <Column>{{ DTASO }} </Column>
        <Column>{{ RESASO }} </Column>
        <Column>{{ CPFMEDFICHA ? CPFMEDFICHA : CPFEMISSORASO }} </Column>
        <Column>{{ NMMEDFICHA ? NMMEDFICHA : NMEMISSORASO }} </Column>
        <Column>{{ NRCRMMEDFICHA ? NRCRMMEDFICHA : NRCRMEMISSORASO }} </Column>
        <Column>{{ UFCRMMEDFICHA ? UFCRMMEDFICHA : UFCRMEMISSORASO }} </Column>
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
.aso-table {
  :deep(tr) {
    &.error {
      color: red;
    }
  }
}
</style>
