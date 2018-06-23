export interface Bloco {
    numero:any;
    andar?:any;
}

export interface Cela {
    codigo:any;
    quantidade_max?:any;
    tipo?:any;
}

export interface Familiar {
    cpf:any;
    data_nascimento?:any;
    rg?:any;
    nome?:any;
    parentesco?:any;
}

export interface Fornecedor {
    cnpj:any;
    nome_empresa?:any;
    item_ofertado?:any;
}

export interface Pavilhao {
    numero:any;
    funcao?:any;
}

export interface Pena {
    artigo_penal:any;
    area_judicial?:any;
    descricao?:any;
    duracao_min?:any;
    duracao_max?:any;
}

export interface Prisioneiro {
    cpf:any;
    data_nascimento?:any;
    observacoes_medicas?:any;
    nome?:any;
    rg?:any;
}

export interface Servidor {
    cpf:any;
    data_nascimento?:any;
    cargo?:any;
    nome?:any;
    salario?:any;
}

export interface UnidadePrisional {
    codigo:any;
    nome?:any;
    rua?:any;
    bairro?:any;
    cidade?:any;
    estado?:any;
    cep?:any;
}