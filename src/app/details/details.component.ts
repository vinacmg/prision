import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  set(key:any, type:string){
    this.name = key;
    let obj = {
      chave: 'artigo_penal',
      artigo_penal:555,
      area_judicial:10,
      descricao:'bonito',
      duracao_min:5,
      duracao_max:10
    };
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
  }

  setAddingItem(value: boolean) {
    this.addingItem = value;
  }

}
