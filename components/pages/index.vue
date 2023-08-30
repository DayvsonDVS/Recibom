<template>
  <div class="index">
    <Form :form="form" @submit="send">
      <div class="date-params">
        <Field
          label="Data inicial"
          name="dataInicio"
          placeholder="00/00/0000"
          mask="99/99/9999"
        />
        <Field
          label="Data final"
          name="dataFim"
          placeholder="00/00/0000"
          mask="99/99/9999"
        />
      </div>

      <div class="sub-params">
        <Field
          name="companies"
          label="Selecione uma empresa"
          :disabled="form.values.all.allCompanies"
          as="select"
        >
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

        <Field name="allCompanies" as="checkbox" class="checkbox-companies">
          Todas
        </Field>

        <Button type="submit" color="primary" :disabled="form.loading"
          >Consultar</Button
        >
      </div>
    </Form>

    <AsoTable />
  </div>
</template>

<script setup lang="ts">
import { useASO } from '@/stores/aso'
import { Field, Form, darpi } from '@cataline.io/darpi'
import { Button } from 'bumi-components-new'

const ASO = useASO()

const form = darpi.newForm({
  companies: darpi.string(),
  dataInicio: darpi.string().required(),
  dataFim: darpi.string().required(),
  allCompanies: darpi.boolean()
})

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

async function init() {
  if (form.values.all.allCompanies) {
    listCompanies.map(async (company) => {
      await companies(company)
    })
  } else {
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
  }
}

async function send() {
  try {
    form.loading = true
    await useAsyncData('initASOs', () => init())
    console.log(ASO.allASOs)
  } catch (error) {
  } finally {
    form.loading = false
  }
}

async function companies(company: string) {
  await Promise.all([
    ASO.fetchAllASOs({
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
  ])
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
    grid-template-columns: 450px 50px 50px;
    gap: 2rem;
    align-items: center;
    .button,
    .checkbox-companies {
      height: fit-content;
      position: relative;
      bottom: -10px;
    }
  }
}
</style>
