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

  combo:any[] = [];
  selected: any;
  type:string;
  value = 'um valor aí';
  bloco = { id_bloco:'', numero:'', andar:'' };
  cela = { id_cela:'', codigo:'', quantidade_max:'', tipo:''};
  familiar = { cpf:'', data_nascimento: '', rg:'', nome:'', parentesco:'' };
  fornecedor = { cnpj:'', nome_empresa:'', item_ofertado:'' };
  pavilhao = { numero:'', funcao:'' };
  servidor = { cpf:'', data_nascimento:'', cargo:'', nome:'', salario:'' };
  unidade = { codigo:'', nome:'', rua:'', bairro:'', cidade:'', estado:'', cep:'' };
  prisioneiro = { cpf:'', data_nascimento:'', observacoes_medicas:'', nome:'', rg:'', cela:'', penas:[] };
  pena = { codigo_penal:'', area_judicial:'', descricao:'', duracao_min:'', duracao_max:'' };
  details:any = {};

  constructor(
    private itemsService: ItemsService,
    private detailsService: DetailsService
  ) { }

  ngOnInit() {
    this.itemsService.change.subscribe(type => {
      this.type = type;
      this.showDetails = false;
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
    this.cela = { id_cela:'', codigo:'', quantidade_max:'', tipo:''};
    this.familiar = { cpf:'', data_nascimento: '', rg:'', nome:'', parentesco:'' };
    this.fornecedor = { cnpj:'', nome_empresa:'', item_ofertado:'' };
    this.pavilhao = { numero:'', funcao:'' };
    this.servidor = { cpf:'', data_nascimento:'', cargo:'', nome:'', salario:'' };
    this.unidade = { codigo:'', nome:'', rua:'', bairro:'', cidade:'', estado:'', cep:'' };
    this.prisioneiro = { cpf:'', data_nascimento:'', observacoes_medicas:'', nome:'', rg:'', cela:'', penas:[] };
    this.pena = { codigo_penal:'', area_judicial:'', descricao:'', duracao_min:'', duracao_max:'' };
  }

  post() {
    switch(this.type) {
      case 'unidades':
      this.detailsService.post(this.unidade);
      break;
    case 'fornecedores':
      this.detailsService.post(this.fornecedor);
      break;
    case 'pavilhões':
      this.detailsService.post(this.pavilhao);
      break;
    case 'blocos':
    this.detailsService.post(this.bloco);
      break;
    case 'celas':
    this.detailsService.post(this.cela);
      break;
    case 'prisioneiros':
    this.detailsService.post(this.prisioneiro);
      break;
    case 'familiares':
    this.detailsService.post(this.familiar);
      break;
    case 'servidores':
      this.detailsService.post(this.servidor);
      break;
    case 'penas':
      this.detailsService.post(this.pena);
      break;
    }
  }

  save() {
    //coloca no banco e 
    this.clear();
  }

}
