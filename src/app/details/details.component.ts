import { Component, OnInit, Input, Output } from '@angular/core';
import { ItemsService } from '../items/items.service';
import { DetailsService } from './details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  showDetails: boolean = false;
  addingItem: boolean = false;
  new: boolean = false;
  combo:any[] = [];
  selected: any;
  type:string;
  value = 'um valor aí';
  bloco = { id_bloco:'', numero:'', andar:'' };
  cela = { codigo:'', capacidade:'', tipo:'', fk_codigo_unidade:''};
  familiar = { cpf:'', data_nascimento: '', rg:'', nome:'', parentesco:'' };
  fornecedor = { cnpj:'', nome_empresa:'', item:'' };
  pavilhao = { numero:'', funcao:'' };
  servidor = { cpf:'', rg:'', data_nascimento:'', cargo:'', nome:'', salario:'' };
  unidade = { codigo:'', nome:'', logradouro:'', bairro:'', cidade:'', uf:'', cep:'' };
  prisioneiro = { cpf:'', data_nascimento:'', observacoes_medicas:[], nome:'', rg:'', cela:'', penas:[] };
  pena = { codigo_penal:'', area_penal:'', descricao:'', pena_minima:'', pena_maxima:'', pena_unidade:'' };
  cumprimento_penas = { codigo:'', prisioneiro:'', area_penal:'',data_inicio:'', data_termino:''};
  details:any = {};

  constructor(
    private itemsService: ItemsService,
    private detailsService: DetailsService
  ) { }

  ngOnInit() {
    this.itemsService.change.subscribe(type => {
      this.type = type;
      this.showDetails = false;
      this.detailsService.getCombo();
    });
    this.detailsService.detailsChanges.subscribe(details => {
      this.details = details[0]; //no futuro, acessar no html só de details, em vez de bloco, cela, etc
      console.log(this.details);
      switch(this.type) {
        case 'unidades':
        this.unidade = this.details;
        break;
      case 'fornecedores':
        this.fornecedor = this.details;
        break;
      case 'pavilhões':
        this.pavilhao = this.details;
        break;
      case 'blocos':
        this.bloco = this.details;
        break;
      case 'celas':
        this.cela = this.details;
        break;
      case 'prisioneiros':
        this.prisioneiro = this.details;
        break;
      case 'familiares':
        this.familiar = this.details;
        break;
      case 'servidores':
        this.servidor = this.details;
        break;
      case 'penas':
        this.pena = this.details;
        break;
      case 'cumprimento_penas':
        this.cumprimento_penas = this.details; 
      }
    });
    this.detailsService.comboChanges.subscribe(combo => {
      this.combo = combo;
    });
  }

  set(item:any){
    this.detailsService.get(item);
  }

  close() {
    this.setAddingItem(false);
    this.showDetails = false;
    this.new = false;
  }

  setAddingItem(value: boolean) {
    this.addingItem = value;
  }

  onChange(event) {
    console.log(event);
  }

  goTo(customOption) {
    this.itemsService.setType(customOption);
  }

  pavilhaoByUnidade() {
    let codigo = this.unidade.codigo;
    this.itemsService.pavilhaoByUnidade(codigo);
  }

  celasByBlocos() {
    this.itemsService.celasByBlocos(this.bloco['numero'], this.bloco['fk_numero_pavilhao']);
  }

  prisioneirosByCela() {
    this.itemsService.prisioneirosByCela(this.cela['codigo']);
  }

  getCombo() {
    this.detailsService.getCombo();
  }
  
  console(message) {
    console.log(message);
  }

  clear() {
    this.bloco = { id_bloco:'', numero:'', andar:'' };
    this.cela = { codigo:'', capacidade:'', tipo:'', fk_codigo_unidade:''};
    this.familiar = { cpf:'', data_nascimento: '', rg:'', nome:'', parentesco:'' };
    this.fornecedor = { cnpj:'', nome_empresa:'', item:'' };
    this.pavilhao = { numero:'', funcao:'' };
    this.servidor = { cpf:'', rg:'', data_nascimento:'', cargo:'', nome:'', salario:'' };
    this.unidade = { codigo:'', nome:'', logradouro:'', bairro:'', cidade:'', uf:'', cep:'' };
    this.prisioneiro = { cpf:'', data_nascimento:'', observacoes_medicas:[], nome:'', rg:'', cela:'', penas:[] };
    this.pena = { codigo_penal:'', area_penal:'', descricao:'', pena_minima:'', pena_maxima:'', pena_unidade:'' };
    this.cumprimento_penas = { codigo:'', prisioneiro:'', area_penal:'',data_inicio:'', data_termino:''};
  }

  post() {
    if(this.new) {
      switch(this.type) {
        case 'unidades':
        this.detailsService.add(this.unidade);
        break;
      case 'fornecedores':
        this.detailsService.add(this.fornecedor);
        break;
      case 'pavilhões':
        this.detailsService.add(this.pavilhao);
        break;
      case 'blocos':
      this.detailsService.add(this.bloco);
        break;
      case 'celas':
      this.detailsService.add(this.cela);
        break;
      case 'prisioneiros':
      this.detailsService.add(this.prisioneiro);
        break;
      case 'familiares':
      this.detailsService.add(this.familiar);
        break;
      case 'servidores':
        this.detailsService.add(this.servidor);
        break;
      case 'penas':
        this.detailsService.add(this.pena);
        break;
      case 'cumprimento_penas':
        this.detailsService.add(this.cumprimento_penas);
      }
      this.addingItem = false;
      this.showDetails = false;
      this.new = false;
    } else {
      switch(this.type) {
        case 'unidades':
        this.detailsService.alter(this.unidade);
        break;
      case 'fornecedores':
        this.detailsService.alter(this.fornecedor);
        break;
      case 'pavilhões':
        this.detailsService.alter(this.pavilhao);
        break;
      case 'blocos':
      this.detailsService.alter(this.bloco);
        break;
      case 'celas':
      this.detailsService.alter(this.cela);
        break;
      case 'prisioneiros':
      this.detailsService.alter(this.prisioneiro);
        break;
      case 'familiares':
      this.detailsService.alter(this.familiar);
        break;
      case 'servidores':
        this.detailsService.alter(this.servidor);
        break;
      case 'penas':
        this.detailsService.alter(this.pena);
        break;
      case 'cumprimento_penas':
        this.detailsService.alter(this.cumprimento_penas);
      }
      this.addingItem = false;
      this.showDetails = false;
    }
    this.clear();
  }

  delete() {
    switch(this.type) {
      case 'unidades':
      this.detailsService.delete(this.unidade);
      break;
    case 'fornecedores':
      this.detailsService.delete(this.fornecedor);
      break;
    case 'pavilhões':
      this.detailsService.delete(this.pavilhao);
      break;
    case 'blocos':
    this.detailsService.delete(this.bloco);
      break;
    case 'celas':
    this.detailsService.delete(this.cela);
      break;
    case 'prisioneiros':
    this.detailsService.delete(this.prisioneiro);
      break;
    case 'familiares':
    this.detailsService.delete(this.familiar);
      break;
    case 'servidores':
      this.detailsService.delete(this.servidor);
      break;
    case 'penas':
      this.detailsService.delete(this.pena);
      break;
    case 'cumprimento_penas':
      this.detailsService.delete(this.cumprimento_penas);
    }
    this.showDetails = false;
    this.clear();
  }

}
