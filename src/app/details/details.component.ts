import { Component, OnInit, Input, Output } from '@angular/core';
import { ItemsService } from '../items/items.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  name: string;
  addingItem: boolean = false;
  keys = [];
  values = [];
  test = [1,2,3];
  selected: any;
  type:string;
  obj:any[];
  value = 'um valor aí';

  constructor(private itemsService: ItemsService) { }

  ngOnInit() {
    this.itemsService.change.subscribe(type => {
      this.type = type;
    });
  }

  set(key:any){ //usar details service pra dar get nessa key aqui dentro
    this.name = key;
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
    /*
    switch(type) {
      case 'unidades':
        break;
      case 'fornecedores':
        break;
      case 'pavilhões':
        break;
      case 'blocos':
        break;
      case 'celas':
        break;
      case 'prisioneiros':
        break;
      case 'familiares':
        break;
      case 'servidores':
        break;
      case 'penas':
        //pega dados do banco
        //apresenta na tela adequadamente
        this.keys = Object.keys(obj);
        this.values = Object.values(obj);
        break;            
      default:
    }
    */
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

}
