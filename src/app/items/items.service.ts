import { Injectable, Output, EventEmitter } from "@angular/core";

@Injectable()
export class ItemsService {

  @Output() change: EventEmitter<string> = new EventEmitter();
  @Output() itemChanges: EventEmitter<Array<any>> = new EventEmitter();

  type:string;
  items:Array<any>;

  constructor() { }

  setType(type:string) {
    this.type = type;
    this.change.emit(this.type);
    //faz get usando type especificado
  }

  fornecedoresByUnidade(codigo: any) {
    this.setType('fornecedores');

    //faz get usando codigo e atribui pra items
    this.items = [{
      chave:'cnpj',
      cnpj:823823982,
      nome_empresa:'bacaníssima',
      item_ofertado:'bananas'
    }, {
      chave:'cnpj',
      cnpj:567823982,
      nome_empresa:'bacaníssima',
      item_ofertado:'bananas'
    },{
      chave:'cnpj',
      cnpj:822323582,
      nome_empresa:'bacaníssima',
      item_ofertado:'bananas'
    }, {
      chave:'cnpj',
      cnpj:823823992,
      nome_empresa:'bacaníssima',
      item_ofertado:'bananas'
    }]

    this.itemChanges.emit(this.items);
  }

  /*
  getItems() {
    this.items = this.http.get<any[]>(this.ROOT_URL + '/posts');
    // o tipo certo, usando switch (invés de any[])
    switch(this.type) {
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
        break;            
      default:
    }
    
  }

  getItem(userid) {
    let params = new HttpParams().set('userId', userid);
    this.items = this.http.get<any[]>(this.ROOT_URL + '/posts', {params});
  }
  */

}