<template>
  <div class="aso-table">
    <Table
      :columns="[
        // 'IDFICHA',
        // 'TPINSCEMPRESA',
        'NRINSCEMPRESA',
        // 'TPINSCUNIDADE',
        // 'NRINSCEMPRESAUNIDADE',
        // 'CODIGOEMPRESA',
        'CODIGOFUNCIONARIO',
        'NMTRAB',
        'CPFTRAB',
        // 'NISTRAB',
        'MATRICULA',
        // 'DATAFICHA',
        'DTASO',
        // 'DTINCLUSAOPARECERASO',
        // 'DTULTALTASO',
        'RESASO',
        // 'RESASOSOC',
        // 'CODIGOMEDICO',
        'NMMEDFICHA',
        'CPFMEDFICHA',
        'NISMEDFICHA',
        'NRCRMMEDFICHA',
        'UFCRMMEDFICHA',
        // 'NMEMISSORASO',
        // 'NRCRMEMISSORASO',
        // 'UFCRMEMISSORASO',
        // 'CPFEMISSORASO',
        // 'NISEMISSORASO',
        // 'NMRESPAVULSO',
        // 'NRCRMRESPAVULSO',
        // 'UFCRMRESPAVULSO',
        // 'CPFRESPAVULSO',
        // 'NISRESPAVULSO',
        'TPEXAMEOCUP',
        // 'CODCATEG',
        'DTEXAME',
        'DESCRICAOEXAME',
        // 'OBSPROC',
        // 'ORDEMEXAME',
        // 'INDRESULTADOALTNORMAL',
        // 'INDRESULTADOAGRAV',
        // 'INDRESULTADOESTAVEL',
        // 'TPEXAME',
        'PROCREALIZADO'
        // 'MATRICULARH'
      ]"
      striped
    >
      <Row
        v-for="{
          // IDFICHA,
          // TPINSCEMPRESA,
          NRINSCEMPRESA,
          // TPINSCUNIDADE,
          // NRINSCEMPRESAUNIDADE,
          // CODIGOEMPRESA,
          CODIGOFUNCIONARIO,
          NMTRAB,
          CPFTRAB,
          // NISTRAB,
          MATRICULA,
          // DATAFICHA,
          DTASO,
          // DTINCLUSAOPARECERASO,
          // DTULTALTASO,
          RESASO,
          // RESASOSOC,
          // CODIGOMEDICO,
          NMMEDFICHA,
          CPFMEDFICHA,
          NISMEDFICHA,
          NRCRMMEDFICHA,
          UFCRMMEDFICHA,
          // NMEMISSORASO,
          // NRCRMEMISSORASO,
          // UFCRMEMISSORASO,
          // CPFEMISSORASO,
          // NISEMISSORASO,
          // NMRESPAVULSO,
          // NRCRMRESPAVULSO,
          // UFCRMRESPAVULSO,
          // CPFRESPAVULSO,
          // NISRESPAVULSO,
          TPEXAMEOCUP,
          // CODCATEG,
          DTEXAME,
          DESCRICAOEXAME,
          // OBSPROC,
          // ORDEMEXAME,
          // INDRESULTADOALTNORMAL,
          // INDRESULTADOAGRAV,
          // INDRESULTADOESTAVEL,
          // TPEXAME,
          PROCREALIZADO
          // MATRICULARH
        } in ASO.asos"
        :uid="CODIGOFUNCIONARIO"
      >
        <!-- <Column>{{ IDFICHA }} </Column>
        <Column>{{ TPINSCEMPRESA }} </Column> -->
        <Column>{{ NRINSCEMPRESA }} </Column>
        <!-- <Column>{{ TPINSCUNIDADE }} </Column>
        <Column>{{ NRINSCEMPRESAUNIDADE }} </Column>
        <Column>{{ CODIGOEMPRESA }} </Column> -->
        <Column>{{ CODIGOFUNCIONARIO }} </Column>
        <Column>{{ NMTRAB }} </Column>
        <Column>{{ CPFTRAB }} </Column>
        <!-- <Column>{{ NISTRAB }} </Column> -->
        <Column>{{ MATRICULA }} </Column>
        <!-- <Column>{{ DATAFICHA }} </Column> -->
        <Column>{{ DTASO }} </Column>
        <!-- <Column>{{ DTINCLUSAOPARECERASO }} </Column>
        <Column>{{ DTULTALTASO }} </Column> -->
        <Column>{{ RESASO }} </Column>
        <!-- <Column>{{ RESASOSOC }} </Column>
        <Column>{{ CODIGOMEDICO }} </Column> -->
        <Column>{{ NMMEDFICHA }} </Column>
        <Column>{{ CPFMEDFICHA }} </Column>
        <Column>{{ NISMEDFICHA }} </Column>
        <Column>{{ NRCRMMEDFICHA }} </Column>
        <Column>{{ UFCRMMEDFICHA }} </Column>
        <!-- <Column>{{ NMEMISSORASO }} </Column>
        <Column>{{ NRCRMEMISSORASO }} </Column>
        <Column>{{ UFCRMEMISSORASO }} </Column>
        <Column>{{ CPFEMISSORASO }} </Column>
        <Column>{{ NISEMISSORASO }} </Column> -->
        <!-- <Column>{{ NMRESPAVULSO }} </Column>
        <Column>{{ NRCRMRESPAVULSO }} </Column>
        <Column>{{ UFCRMRESPAVULSO }} </Column>
        <Column>{{ CPFRESPAVULSO }} </Column>
        <Column>{{ NISRESPAVULSO }} </Column> -->
        <Column>{{ TPEXAMEOCUP }} </Column>
        <!-- <Column>{{ CODCATEG }} </Column> -->
        <Column>{{ DTEXAME }} </Column>
        <Column>{{ DESCRICAOEXAME }} </Column>
        <!-- <Column>{{ OBSPROC }} </Column> -->
        <!-- <Column>{{ ORDEMEXAME }} </Column>
        <Column>{{ INDRESULTADOALTNORMAL }} </Column>
        <Column>{{ INDRESULTADOAGRAV }} </Column>
        <Column>{{ INDRESULTADOESTAVEL }} </Column> -->
        <!-- <Column>{{ TPEXAME }} </Column> -->
        <Column>{{ PROCREALIZADO }} </Column>
        <!-- <Column>{{ MATRICULARH }} </Column> -->
      </Row>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { Table, Row, Column } from 'bumi-components-new'
import { useASO } from '@/stores/aso'

const ASO = useASO()
</script>
