import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UnidadePrisional, Fornecedor, Pavilhao, Bloco, Cela, Prisioneiro, Familiar, Servidor, Pena } from "../models/interfaces";

@Injectable()
export class ItemsService {

  @Output() change: EventEmitter<string> = new EventEmitter();
  @Output() itemChanges: EventEmitter<Array<any>> = new EventEmitter();
  @Output() fatherChanges: EventEmitter<string> = new EventEmitter();

  readonly ROOT_URL = 'http://localhost/prision/bd-api';
  
  type:string;
  itemsObs:Observable<Array<any>>;
  items: Array<any>;

  constructor(private http: HttpClient) { }

  setType(type:string) {
    this.type = type;
    this.change.emit(this.type);
    //faz get usando type especificado
    this.getItems();
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
        this.http.get<any[]>(this.ROOT_URL + '/unidades/listar').subscribe(items => {
          this.items = items;
          this.items.map(item => item.chave = 'codigo');
          this.itemChanges.emit(this.items);
        });
        break;
      case 'fornecedores':
        this.http.get<any[]>(this.ROOT_URL + '/fornecedores/listar').subscribe(items => {
          this.items = items;
          this.items.map(item => item.chave = 'cnpj');
          this.itemChanges.emit(this.items);
        });
        break;
      case 'pavilhões':
        this.http.get<any[]>(this.ROOT_URL + '/pavilhoes/listar').subscribe(items => {
          this.items = items;
          this.items.map(item => item.chave = 'id_pavilhao');
          this.itemChanges.emit(this.items);
        });
        break;
      case 'blocos':
        this.http.get<any[]>(this.ROOT_URL + '/blocos/listar').subscribe(items => {
          this.items = items;
          this.items.map(item => item.chave = 'id_bloco');
          this.itemChanges.emit(this.items);
        });
        break;
      case 'celas':
        this.http.get<any[]>(this.ROOT_URL + '/celas/listar').subscribe(items => {
          this.items = items;
          this.items.map(item => item.chave = 'id_cela');
          this.itemChanges.emit(this.items);
        });
        break;
      case 'prisioneiros':
        this.http.get<any[]>(this.ROOT_URL + '/prisioneiros/listar').subscribe(items => {
          this.items = items;
          this.items.map(item => item.chave = 'cpf');
          this.itemChanges.emit(this.items);
        });
        break;
      case 'familiares':
        this.http.get<any[]>(this.ROOT_URL + '/familiares/listar').subscribe(items => {
          this.items = items;
          this.items.map(item => item.chave = 'cpf');
          this.itemChanges.emit(this.items);
        });
        break;
      case 'servidores':
        this.http.get<any[]>(this.ROOT_URL + '/servidores/listar').subscribe(items => {
          this.items = items;
          this.items.map(item => item.chave = 'cpf');
          this.itemChanges.emit(this.items);
        });
        break;
      case 'penas':
        this.http.get<any[]>(this.ROOT_URL + '/penas/listar').subscribe(items => {
          this.items = items;
          this.items.map(item => item.chave = 'codigo_penal');
          this.itemChanges.emit(this.items);
        });
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