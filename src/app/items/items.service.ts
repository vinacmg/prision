import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UnidadePrisional, Fornecedor, Pavilhao, Bloco, Cela, Prisioneiro, Familiar, Servidor, Pena } from "../models/interfaces";

@Injectable()
export class ItemsService {

  @Output() change: EventEmitter<string> = new EventEmitter();
  @Output() itemChanges: EventEmitter<Array<any>> = new EventEmitter();
  @Output() fatherChanges: EventEmitter<string> = new EventEmitter();

  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com';
  
  type:string;
  itemsObs:Observable<Array<any>>;
  items: Array<any>;

  constructor(private http: HttpClient) { }

  setType(type:string) {
    this.type = type;
    this.change.emit(this.type);
    //faz get usando type especificado
  }

  fornecedoresByUnidade(codigo: any) {
    this.setType('fornecedores');
    this.fatherChanges.emit(` (Unidade ${codigo})`);
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

  getItems() {
    switch(this.type) {
      case 'unidades':
        this.itemsObs = this.http.get<any[]>(this.ROOT_URL + '/posts');
        break;
      case 'fornecedores':
        this.itemsObs = this.http.get<any[]>(this.ROOT_URL + '/posts');
        break;
      case 'pavilhões':
        this.itemsObs = this.http.get<any[]>(this.ROOT_URL + '/posts');
        break;
      case 'blocos':
        this.itemsObs = this.http.get<any[]>(this.ROOT_URL + '/posts');
        break;
      case 'celas':
        this.itemsObs = this.http.get<any[]>(this.ROOT_URL + '/posts');
        break;
      case 'prisioneiros':
        this.itemsObs = this.http.get<any[]>(this.ROOT_URL + '/posts');
        break;
      case 'familiares':
        this.itemsObs = this.http.get<any[]>(this.ROOT_URL + '/posts');
        break;
      case 'servidores':
       this.itemsObs = this.http.get<any[]>(this.ROOT_URL + '/posts');
        break;
      case 'penas':
        this.itemsObs = this.http.get<any[]>(this.ROOT_URL + '/posts');
        break;            
      default:
    }
  }
  /*
  getItem(userid) {
    let params = new HttpParams().set('userId', userid);
    this.items = this.http.get<any[]>(this.ROOT_URL + '/posts', {params});
  }
  */

}