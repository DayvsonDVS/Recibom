export interface Toxicologico {
  IDFICHA: string
  TPINSCEMPRESA: string
  NRINSCEMPRESA: string
  TPINSCUNIDADE: string
  NRINSCEMPRESAUNIDADE: string
  CODIGOEMPRESA: string
  CODIGOFUNCIONARIO: string
  NMTRAB: string
  CPFTRAB: string
  NISTRAB: string
  MATRICULA: string
  IDRESULTADOEXAME: string
  DTEXAME: string
  CNPJLAB: string
  CODSEQEXAME: string
  NMMED: string
  NRCRM: string
  UFCRM: string
  CODMED: string
  STATUS: String
}

export interface queryPayloadToxicologico {
  empresa: string
  codigo: string
  chave: string
  tipoSaida: string
  funcionarioInicio: string
  funcionarioFim: string
  pFuncionario: string
  funcionario: string
  dataInicio: string
  dataFim: string
  pDataToxic: string
}
