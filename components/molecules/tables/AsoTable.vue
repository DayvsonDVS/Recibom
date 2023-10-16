<template>
  <div class="aso-table">
    <Table :columns="[
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
    ]" striped>
      <Row v-for="{
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
      } in ASO.getDistinctASO" :class="!NMEMISSORASO && !NMMEDFICHA ? 'error' : ''">
        <Column>{{ CPFTRAB?.replace(/[,.\/-]/g, '').replace(/^0+/, '') }} </Column>
        <Column>{{ NRINSCEMPRESA?.replace(/[,.\/-]/g, '').replace(/^0+/, '') }} </Column>
        <Column>{{ CPFRESP?.replace(/[,.\/-]/g, '') }} </Column>
        <Column>{{ NOMERESPONSAVEL }} </Column>
        <Column>{{ NRCONSCLASSE }} </Column>
        <Column>{{ UFCONSCLASSE }} </Column>
        <Column>{{ TPEXAMEOCUP }} </Column>
        <Column>{{ DTASO }} </Column>
        <Column>{{ RESASO }} </Column>
        <Column>{{ CPFMEDFICHA ? CPFMEDFICHA.replace(/[,.\/-]/g, '') : CPFEMISSORASO.replace(/[,.\/-]/g, '') }} </Column>
        <Column>{{
          NMEMISSORASO ? NMEMISSORASO.toUpperCase() : NMMEDFICHA.toUpperCase()
        }}
        </Column>
        <Column>{{ NRCRMEMISSORASO ? NRCRMEMISSORASO : NRCRMMEDFICHA }}
        </Column>
        <Column>{{ UFCRMEMISSORASO ? UFCRMEMISSORASO : UFCRMMEDFICHA }}
        </Column>
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
