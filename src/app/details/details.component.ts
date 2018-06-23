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
  bloco = { numero:0, andar:0 };
  cela = { codigo:0, quantidade_max:0, tipo:''};
  familiar = { cpf:'', data_nascimento: '', rg:'', nome:'', parentesco:'' };
  fornecedor = { cnpj:'', nome_empresa:'', item_ofertado:'' };
  pavilhao = { numero:0, funcao:'' };
  servidor = { cpf:'', data_nascimento:'', cargo:'', nome:'', salario:0 };
  unidade = { codigo:0, nome:'', rua:'', bairro:'', cidade:'', estado:'', cep:'' };
  prisioneiro = { cpf:'', data_nascimento:'', observacoes_medicas:'', nome:'', rg:'' };
  pena = { codigo_penal:'', area_judicial:'', descricao:'', duracao_min:0, duracao_max:0 };

  constructor(
    private itemsService: ItemsService,
    private detailsService: DetailsService
  ) { }

  ngOnInit() {
    this.itemsService.change.subscribe(type => {
      this.type = type;
      this.showDetails = false;
    });
  }

  set(key:any){ //usar details service pra dar get nessa key aqui dentro
    /*
    let obj = {
      chave: 'artigo_penal',
      artigo_penal:555,
      area_judicial:10,
      descricao:'bonito',
      duracao_min:5,
      duracao_max:10
    };
    this.keys = Object.keys(obj);
    this.values = Object.values(obj);
    */
    switch(this.type) {
      case 'unidades':
        this.unidade = this.detailsService.get('teste');
        break;
      case 'fornecedores':
        this.fornecedor = this.detailsService.get('teste');
        break;
      case 'pavilhões':
        this.pavilhao = this.detailsService.get('teste');
        break;
      case 'blocos':
        this.bloco = this.detailsService.get('teste');
        break;
      case 'celas':
        this.cela = this.detailsService.get('teste');
        break;
      case 'prisioneiros':
        this.prisioneiro = this.detailsService.get('teste');
        break;
      case 'familiares':
        this.familiar = this.detailsService.get('teste');
        break;
      case 'servidores':
        this.servidor = this.detailsService.get('teste');
        break;
      case 'penas':
        this.pena = this.detailsService.get('teste');
        break;            
      default:
    }
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
    this.bloco = { numero:0, andar:0 };
    this.cela = { codigo:0, quantidade_max:0, tipo:''};
    this.familiar = { cpf:'', data_nascimento: '', rg:'', nome:'', parentesco:'' };
    this.fornecedor = { cnpj:'', nome_empresa:'', item_ofertado:'' };
    this.pavilhao = { numero:0, funcao:'' };
    this.servidor = { cpf:'', data_nascimento:'', cargo:'', nome:'', salario:0 };
    this.unidade = { codigo:0, nome:'', rua:'', bairro:'', cidade:'', estado:'', cep:'' };
    this.prisioneiro = { cpf:'', data_nascimento:'', observacoes_medicas:'', nome:'', rg:'' };
    this.pena = { codigo_penal:'', area_judicial:'', descricao:'', duracao_min:0, duracao_max:0 };
  }

  save() {
    //coloca no banco e 
    this.clear();
  }

}
