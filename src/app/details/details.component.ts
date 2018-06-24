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
  keys = [];
  values = [];
  test = [1,2,3];
  selected: any;
  type:string;
  obj:any[];
  value = 'um valor aí';
  bloco = { numero:'', andar:'' };
  cela = { codigo:'', quantidade_max:'', tipo:''};
  familiar = { cpf:'', data_nascimento: '', rg:'', nome:'', parentesco:'' };
  fornecedor = { cnpj:'', nome_empresa:'', item_ofertado:'' };
  pavilhao = { numero:'', funcao:'' };
  servidor = { cpf:'', data_nascimento:'', cargo:'', nome:'', salario:'' };
  unidade = { codigo:'', nome:'', rua:'', bairro:'', cidade:'', estado:'', cep:'' };
  prisioneiro = { cpf:'', data_nascimento:'', observacoes_medicas:'', nome:'', rg:'' };
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

  fornecedoresByUnidade(codigo) {
    this.itemsService.fornecedoresByUnidade(codigo);
  }

  clear() {
    this.bloco = { numero:'', andar:'' };
    this.cela = { codigo:'', quantidade_max:'', tipo:''};
    this.familiar = { cpf:'', data_nascimento: '', rg:'', nome:'', parentesco:'' };
    this.fornecedor = { cnpj:'', nome_empresa:'', item_ofertado:'' };
    this.pavilhao = { numero:'', funcao:'' };
    this.servidor = { cpf:'', data_nascimento:'', cargo:'', nome:'', salario:'' };
    this.unidade = { codigo:'', nome:'', rua:'', bairro:'', cidade:'', estado:'', cep:'' };
    this.prisioneiro = { cpf:'', data_nascimento:'', observacoes_medicas:'', nome:'', rg:'' };
    this.pena = { codigo_penal:'', area_judicial:'', descricao:'', duracao_min:'', duracao_max:'' };
  }

  save() {
    //coloca no banco e 
    this.clear();
  }

}
