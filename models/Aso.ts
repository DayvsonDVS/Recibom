export interface Aso {
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
  DATAFICHA: string
  DTASO: string
  DTINCLUSAOPARECERASO: string
  DTULTALTASO: string
  RESASO: string
  RESASOSOC: string
  CODIGOMEDICO: string
  NMMEDFICHA: string
  CPFMEDFICHA: string
  NISMEDFICHA: string
  NRCRMMEDFICHA: string
  UFCRMMEDFICHA: string
  NMEMISSORASO: string
  NRCRMEMISSORASO: string
  UFCRMEMISSORASO: string
  CPFEMISSORASO: string
  NISEMISSORASO: string
  NMRESPAVULSO: string
  NRCRMRESPAVULSO: string
  UFCRMRESPAVULSO: string
  CPFRESPAVULSO: string
  NISRESPAVULSO: string
  TPEXAMEOCUP: string
  CODCATEG: string
  DTEXAME: string
  DESCRICAOEXAME: string
  OBSPROC: string
  ORDEMEXAME: string
  INDRESULTADOALTNORMAL: string
  INDRESULTADOAGRAV: string
  INDRESULTADOESTAVEL: string
  TPEXAME: string
  PROCREALIZADO: string
  MATRICULARH: string
  CPFRESP: string
  NOMERESPONSAVEL: string
  NRCONSCLASSE: string
  UFCONSCLASSE: string
  STATUS: string
}

export interface responsibleASO {
  sequencial: string
  cpfResp: string
  nomeResponsavel: string
  nrConsClasse: string
  ufConsClasse: string
}

export interface queryPayload {
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
  pDataIncAso: string
  tpExame: string
}

export interface queryPayloadResponsible {
  empresa: string
  codigo: string
  chave: string
  tipoSaida: string
  sequencial: string
}
