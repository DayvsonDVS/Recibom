<template>
  <div class="toxic-table">
    <Table :columns="[
      'CNPJ Empresa',
      'CPF_Funcionario',
      'data_Exame',
      'cnpj_Laboratorio',
      'codSeqExame',
      'Nome_Médico',
      'CRM_Medico',
      'CRM_UF',
      'Status',
    ]" striped>
      <Row v-for="{
      NRINSCEMPRESA,
      CPFTRAB,
      DTEXAME,
      CNPJLAB,
      CODSEQEXAME,
      NMMED,
      NRCRM,
      UFCRM,
      IDRESULTADOEXAME,
      STATUS
    } in ASO.getToxic" :class="!NMMED || !CODSEQEXAME || !CNPJLAB ? 'error' : ''">
        <Column>{{ NRINSCEMPRESA?.replace(/[,.\/-]/g, '') }} </Column>
        <Column>{{ CPFTRAB?.replace(/[,.\/-]/g, '') }} </Column>
        <Column>{{ DTEXAME }} </Column>
        <Column>{{ CNPJLAB?.replace(/[,.\/-]/g, '').replace(/^0+/, '') }} </Column>
        <Column>{{ CODSEQEXAME }} </Column>
        <Column>{{ NMMED }} </Column>
        <Column>{{ NRCRM }} </Column>
        <Column>{{ UFCRM }} </Column>
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
.toxic-table {
  :deep(tr) {
    &.error {
      color: red;
    }
  }
}
</style>
