<template>
  <div class="index" ref="index">
    <Form :form="form" @submit="send">
      <div class="date-params">
        <Field label="Data inicial" name="dataInicio" placeholder="00/00/0000" mask="99/99/9999" />
        <Field label="Data final" name="dataFim" placeholder="00/00/0000" mask="99/99/9999" />
      </div>

      <div class="sub-params">
        <Field name="companies" label="Selecione a empresa" as="select" :disabled="form.loading">
          <option value="all" selected>Todas</option>
          <option value="582049">Cesta Basica Olindense Ltda</option>
          <option value="554798">Estivas Novo Prado Ltda</option>
          <option value="510728">Feirão da Mustardinha Ltda</option>
          <option value="723851">
            Feirão da Mustardinha Ltda - Tamarineira
          </option>
          <option value="512817">Supermercado Albatroz Ltda</option>
          <option value="823378">Supermercado Albatroz Ltda 2</option>
          <option value="717005">
            Supermercado Prazeres Ltda - Boa Viagem
          </option>
          <option value="509456">Supermercado Prazeres Ltda - Piedade</option>
          <option value="823389">Supermercado Prazeres Ltda - Pina</option>
          <option value="723848">Supermercado Prazeres Ltda - Torre</option>
          <option value="514165">Varejao Sao Martins Ltda</option>
          <option value="809143">Varejão São Martins Ltda - Matriz</option>
        </Field>

        <Field name="radioTable" as="radio-group" label="Tipo de Tabela">
          <span as="radio-item" value="ASO" checked>ASO</span>
          <span as="radio-item" value="EXAME">EXAME</span>
          <span as="radio-item" value="TOXICOLÓGICO">TOXICOLÓGICO</span>
        </Field>

        <div class="wrapper-button">
          <Button type="submit" color="primary" :disabled="form.loading">Consultar</Button>
          <Button color="success" :disabled="!ASO.readyDownload"
            @click=" download(form.values.all.radioTable!)">Download</Button>
        </div>
      </div>
    </Form>

    <div class="table">
      <AsoTable id="asoId" v-show="form.values.all.radioTable === 'ASO'" />
      <AsoExameTable id="examesId" v-show="form.values.all.radioTable === 'EXAME'" />
      <ToxicTable id="toxicId" v-show="form.values.all.radioTable === 'TOXICOLÓGICO'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useASO } from '@/stores/aso'
import { Field, Form, darpi } from '@cataline.io/darpi'
import { Button } from 'bumi-components-new'
import * as XLSX from 'xlsx'

const listCompanies = [
  '582049',
  '554798',
  '510728',
  '723851',
  '512817',
  '823378',
  '717005',
  '509456',
  '823389',
  '723848',
  '514165',
  '809143'
]

const ASO = useASO()
const index = ref<HTMLElement>()

const form = darpi.newForm({
  companies: darpi.string().required(),
  dataInicio: darpi.string().required(),
  dataFim: darpi.string().required(),
  radioTable: darpi.string()
})

async function send() {
  try {
    form.loading = true
    ASO.readyDownload = false
    index.value!.style.cursor = 'progress'

    await useAsyncData('initASOs', () => init())
  } catch (error) {
  } finally {
    form.loading = false
    ASO.readyDownload = true
    index.value!.style.cursor = 'default'
  }
}

async function init() {
  if (form.values.all.companies.includes('all')) {
    ASO.allASOs = []
    ASO.asos = []
    ASO.toxics = []

    for (const company of listCompanies) {
      await fetchCompaniesASOs(company)
    }

    for (const company of listCompanies) {
      await fetchResponsibleASOs(company)
    }

  } else {
    ASO.asos = []
    ASO.allASOs = []
    ASO.toxics = []

    await Promise.all([
      ASO.fetchASOs({
        empresa: form.values.all.companies!,
        codigo: '161890',
        chave: 'ce2616f3f9252750be15',
        tipoSaida: 'json',
        funcionarioInicio: '0',
        funcionarioFim: '9999999999',
        pFuncionario: '0',
        funcionario: '0',
        dataInicio: form.values.all.dataInicio,
        dataFim: form.values.all.dataFim,
        pDataIncAso: '2',
        tpExame: '1,2,3,4,5,6'
      })
    ])

    await Promise.all([
      ASO.fetchToxicologico({
        empresa: form.values.all.companies!,
        codigo: '196089',
        chave: 'da258baa4642c8184cf5',
        tipoSaida: 'json',
        funcionarioInicio: '0',
        funcionarioFim: '9999999999',
        pFuncionario: '0',
        funcionario: '0',
        dataInicio: form.values.all.dataInicio,
        dataFim: form.values.all.dataFim,
        pDataToxic: ""
      })
    ])

    const listSequencial = [] as string[]
    ASO.asos.filter(({ IDFICHA }) => listSequencial.push(IDFICHA))


    await Promise.all([
      ASO.fetchResponsibleASO({
        empresa: form.values.all.companies,
        codigo: '185454',
        chave: 'ffb76514e30c7cbaec94',
        tipoSaida: 'json',
        sequencial: listSequencial.join()
      })
    ])

  }
}

async function fetchCompaniesASOs(company: string) {
  await ASO.fetchAllASOs({
    empresa: company,
    codigo: '161890',
    chave: 'ce2616f3f9252750be15',
    tipoSaida: 'json',
    funcionarioInicio: '0',
    funcionarioFim: '9999999999',
    pFuncionario: '0',
    funcionario: '0',
    dataInicio: form.values.all.dataInicio,
    dataFim: form.values.all.dataFim,
    pDataIncAso: '2',
    tpExame: '1,2,3,4,5,6'
  })
  await ASO.fetchToxicologico({
    empresa: company,
    codigo: '196089',
    chave: 'da258baa4642c8184cf5',
    tipoSaida: 'json',
    funcionarioInicio: '0',
    funcionarioFim: '9999999999',
    pFuncionario: '0',
    funcionario: '0',
    dataInicio: form.values.all.dataInicio,
    dataFim: form.values.all.dataFim,
    pDataToxic: ''
  })
}

async function fetchResponsibleASOs(company: string) {
  const listSequencial = [] as string[]
  ASO.allASOs.filter(({ IDFICHA }) => listSequencial.push(IDFICHA))

  const removeDuplicateList = [...new Set(listSequencial)]

  if (removeDuplicateList.length > 100) {
    const [part1, part2] = splitListInHalf(removeDuplicateList)

    await ASO.fetchAllResponsibleASO({
      empresa: company,
      codigo: '185454',
      chave: 'ffb76514e30c7cbaec94',
      tipoSaida: 'json',
      sequencial: part1.join()
    })

    await ASO.fetchAllResponsibleASO({
      empresa: company,
      codigo: '185454',
      chave: 'ffb76514e30c7cbaec94',
      tipoSaida: 'json',
      sequencial: part2.join()
    })

  }
  else {
    await ASO.fetchAllResponsibleASO({
      empresa: company,
      codigo: '185454',
      chave: 'ffb76514e30c7cbaec94',
      tipoSaida: 'json',
      sequencial: removeDuplicateList.join()
    })
  }

}

function download(fileName: string) {
  if (fileName === 'ASO') {
    downloadTableAsExcel('asoId', 'ASOs.xlsx')
  }
  else if (fileName === 'EXAME') {
    downloadTableAsExcel('examesId', 'EXAMES.xlsx')
  }
  else {
    downloadTableAsExcel('toxicId', 'Toxicológico.xlsx')
  }
}

function downloadTableAsExcel(tableId: string, filename: string) {
  const table = document.getElementById(tableId);
  if (table) {
    const wb = XLSX.utils.table_to_book(table, { sheet: 'Sheet 1', raw: true });
    const wbout = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array',
      bookSST: true,
      cellDates: true,
      cellStyles: true,
    });
    saveAsExcel(wbout, filename);
  } else {
    console.error(`Table with id ${tableId} not found.`);
  }
}

function saveAsExcel(buffer: any, filename: string) {
  const data = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = window.URL.createObjectURL(data);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

function splitListInHalf(inputList: string[]): [string[], string[]] {
  const length = inputList.length;
  const half = Math.floor(length / 2);

  const firstHalf = inputList.slice(0, half);
  const secondHalf = inputList.slice(half);

  return [firstHalf, secondHalf];
}
</script>
<style scoped lang="scss">
.index {
  padding: 15px;
  display: grid;
  gap: 1rem;

  .date-params {
    display: grid;
    grid-template-columns: repeat(2, max-content);
    gap: 1rem;
  }

  .sub-params {
    display: grid;
    grid-auto-flow: row;
    gap: 1rem;
    align-items: center;

    :deep(.select-container) {
      width: 420px;
    }

    .wrapper-button {
      display: grid;
      grid-auto-flow: column;
      justify-content: left;
      gap: 2rem;

    }
  }

}
</style>
