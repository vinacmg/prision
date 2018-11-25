import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { UnidadePrisional, Fornecedor, Pavilhao, Bloco, Cela, Prisioneiro, Familiar, Servidor, Pena } from "../models/interfaces";

@Injectable()
export class ItemsService {

  @Output() change: EventEmitter<string> = new EventEmitter();
  @Output() itemChanges: EventEmitter<Array<any>> = new EventEmitter();
  @Output() fatherChanges: EventEmitter<string> = new EventEmitter();

  readonly ROOT_URL = 'http://localhost:5000';
  
  type:string;
  items: Array<any>;

  constructor(private http: HttpClient) { }

  setType(type:string) {
    this.type = type;
    this.change.emit(this.type);
  }

  pavilhaoByUnidade(codigo: any) {
    this.setType('pavilhões');
    this.fatherChanges.emit(` (Unidade ${codigo})`);
    let params = new HttpParams().set('codigo', codigo);
    this.http.get<any>(this.ROOT_URL + '/unidades/pavilhoes', {params: params}).subscribe(items => {
      this.items = items;
      this.items.map(item => item.chave = 'id_pavilhao');
      this.itemChanges.emit(this.items);
      console.log(items);
    });

  }

  celasByBlocos(fk_numero_bloco, fk_numero_pavilhao) {
    this.setType('celas');
    this.fatherChanges.emit(` (Bloco Número${fk_numero_bloco}, Pavilhão ${fk_numero_pavilhao})`);
    let params = new HttpParams().set('fk_numero_bloco', fk_numero_bloco).set('fk_numero_pavilhao', fk_numero_pavilhao);
    this.http.get<any>(this.ROOT_URL + '/blocos/celas', {params: params}).subscribe(items => {
      this.items = items;
      this.items.map(item => item.chave = 'codigo');
      this.itemChanges.emit(this.items);
    });
  }

  prisioneirosByCela(codigo: any) {
    this.setType('prisioneiros');
    this.fatherChanges.emit(` (Cela ${codigo})`);
    let params = new HttpParams().set('codigo', codigo);
    this.http.get<any>(this.ROOT_URL + '/celas/prisioneiros', {params: params}).subscribe(items => {
      this.items = items;
      this.items.map(item => item.chave = 'cpf');
      this.itemChanges.emit(this.items);
    });
  }

  getItems() {
    this.itemChanges.emit([]);
    switch(this.type) {
      case 'unidades':
        this.http.get<JSON[]>(this.ROOT_URL + '/unidades/listar').subscribe(items => {
          this.items = items;
          this.items.map(item => item.chave = 'codigo');
          this.itemChanges.emit(this.items);
        });
        break;
      case 'fornecedores':
        this.http.get<JSON[]>(this.ROOT_URL + '/fornecedores/listar').subscribe(items => {
          this.items = items;
          this.items.map(item => item.chave = 'cnpj');
          this.itemChanges.emit(this.items);
        });
        break;
      case 'pavilhões':
        this.http.get<JSON[]>(this.ROOT_URL + '/pavilhoes/listar').subscribe(items => {
          this.items = items;
          this.items.map(item => item.chave = 'numero');
          this.itemChanges.emit(this.items);
        });
        break;
      case 'blocos':
        this.http.get<JSON[]>(this.ROOT_URL + '/blocos/listar').subscribe(items => {
          this.items = items;
          this.items.map(item => item.chave = 'id_bloco');
          console.log(items);
          this.itemChanges.emit(this.items);
        });
        break;
      case 'celas':
        this.http.get<JSON[]>(this.ROOT_URL + '/celas/listar').subscribe(items => {
          this.items = items;
          this.items.map(item => item.chave = 'codigo');
          this.itemChanges.emit(this.items);
        });
        break;
      case 'prisioneiros':
        this.http.get<JSON[]>(this.ROOT_URL + '/prisioneiros/listar').subscribe(items => {
          this.items = items;
          this.items.map(item => item.chave = 'cpf');
          this.itemChanges.emit(this.items);
        });
        break;
      case 'familiares':
        this.http.get<JSON[]>(this.ROOT_URL + '/familiares/listar').subscribe(items => {
          this.items = items;
          this.items.map(item => item.chave = 'cpf');
          this.itemChanges.emit(this.items);
        });
        break;
      case 'servidores':
        this.http.get<JSON[]>(this.ROOT_URL + '/servidores/listar').subscribe(items => {
          this.items = items;
          this.items.map(item => item.chave = 'cpf');
          this.itemChanges.emit(this.items);
        });
        break;
      case 'penas':
        this.http.get<JSON[]>(this.ROOT_URL + '/penas/listar').subscribe(items => {
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