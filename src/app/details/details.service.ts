import { Injectable, Output, EventEmitter } from "@angular/core";
import { ItemsService } from "../items/items.service";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";

@Injectable()
export class DetailsService {

  @Output() detailsChanges: EventEmitter<any> = new EventEmitter();
  @Output() comboChanges: EventEmitter<any> = new EventEmitter();
  @Output() checkmarkChanges: EventEmitter<any> = new EventEmitter();

  ROOT_URL:string;

  details:any;
  combo:any;
  checkmark:any;
  type:string;
  
  constructor(
    private itemsService: ItemsService, 
    private http: HttpClient 
  ) { 
    this.itemsService.change.subscribe(type => {
      this.type = type;
    });
    this.ROOT_URL  = itemsService.ROOT_URL;//Entidade no plural/criar, alterar, listar, buscar, remover
  }

  post(item: any) {
    const headers = new HttpHeaders().append('Content-Type', 'application/json; charset=utf-8');
    switch(this.type) {
      case 'unidades':
        this.http.post(this.ROOT_URL + '/unidades/criar', item,{ headers: headers}).subscribe(resp => {
          console.log(resp);
        });
        break;
      case 'fornecedores':
        this.http.post(this.ROOT_URL + '/fornecedores/criar', item, { headers: headers}).subscribe(resp => {
          console.log(resp);
        });
        break;
      case 'pavilhões':
        this.http.post<any>(this.ROOT_URL + '/pavilhoes/criar', item);
        break;
      case 'blocos':
        this.http.post<any>(this.ROOT_URL + '/blocos/criar', item);
        break;
      case 'celas':
        this.http.post<any>(this.ROOT_URL + '/celas/criar', item);
        break;
      case 'prisioneiros':
        this.http.post<any>(this.ROOT_URL + '/prisioneiros/criar', item);
        break;
      case 'familiares':
        this.http.post<any>(this.ROOT_URL + '/familiares/criar', item);
        break;
      case 'servidores':
        this.http.post<any>(this.ROOT_URL + '/servidores/criar', item);
        break;
      case 'penas':
        this.http.post<any>(this.ROOT_URL + '/penas/criar', item);
        break;            
      default:
    }
  }

  get(item:any) {
    const type = this.type;
    let params = new HttpParams().set(item.chave, item[item.chave]);
    switch(type) {
      case 'unidades':
        this.http.get<any>(this.ROOT_URL + '/unidades/buscar', {params: params}).subscribe(details => {
          this.details = details;
          this.detailsChanges.emit(this.details);
        });
        break;
      case 'fornecedores':
        this.http.get<any>(this.ROOT_URL + '/fornecedores/buscar', {params: params}).subscribe(details => {
          this.details = details;
          this.detailsChanges.emit(this.details);
        });
        break;
      case 'pavilhões':
        this.http.get<any>(this.ROOT_URL + '/pavilhoes/buscar', {params: new HttpParams().set('fk_unid_prisional', item['fk_unid_prisional']).set('numero', item['numero'])}).subscribe(details => {
          this.details = details;
          this.detailsChanges.emit(this.details);
        });
        break;
      case 'blocos':
        this.http.get<any>(this.ROOT_URL + '/blocos/buscar', {params: new HttpParams().set('fk_numero_pavilhao', item['fk_numero_pavilhao']).set('numero', item['numero'])}).subscribe(details => {
          this.details = details;
          this.detailsChanges.emit(this.details);
        });
        break;
      case 'celas':
        this.http.get<any>(this.ROOT_URL + '/celas/buscar', {params: params}).subscribe(details => {
          this.details = details;
          this.detailsChanges.emit(this.details);
        });
        break;
      case 'prisioneiros':
        this.http.get<any>(this.ROOT_URL + '/prisioneiros/buscar', {params: params}).subscribe(details => {
          this.details = details;
          this.http.get<any>(this.ROOT_URL + '/prisioneiros/penas', {params: new HttpParams().set('fk_prisioneiro', item[item.chave])}).subscribe(penas => {
            this.details.penas = penas;
            this.detailsChanges.emit(this.details);
          });
        });
        break;
      case 'familiares':
        this.http.get<any>(this.ROOT_URL + '/familiares/buscar', {params: params}).subscribe(details => {
          this.details = details;
          this.detailsChanges.emit(this.details);
        });
        break;
      case 'servidores':
        this.http.get<any>(this.ROOT_URL + '/servidores/buscar', {params: params}).subscribe(details => {
          this.details = details;
          this.detailsChanges.emit(this.details);
        });
        break;
      case 'penas':
        this.http.get<any>(this.ROOT_URL + '/penas/buscar', {params: params}).subscribe(details => {
          this.details = details;
          this.detailsChanges.emit(this.details);
        });
        break;            
      default:
    }
  }

  getCombo() {
    switch(this.type) {
      case 'pavilhões':
        this.http.get<any[]>(this.ROOT_URL + '/unidades/listar').subscribe(items => {
          this.combo = items;
          this.combo.map(item => item.chave = 'id_pavilhao');
          this.comboChanges.emit(this.combo);
        });
        break;
      case 'blocos':
        this.http.get<any[]>(this.ROOT_URL + '/pavilhoes/listar').subscribe(items => {
          this.combo = items;
          this.combo.map(item => item.chave = 'id_bloco');
          this.comboChanges.emit(this.combo);
        });
        break;
      case 'celas':
        this.http.get<any[]>(this.ROOT_URL + '/blocos/listar').subscribe(items => {
          this.combo = items;
          this.combo.map(item => item.chave = 'codigo');
          this.comboChanges.emit(this.combo);
        });
        break;
      case 'prisioneiros':
        this.http.get<any[]>(this.ROOT_URL + '/celas/listar').subscribe(items => {
          this.combo = items;
          this.combo.map(item => item.chave = 'codigo');
          console.log(this.combo);
          this.comboChanges.emit(this.combo);
        });
        break;
      case 'familiares':
        this.http.get<any[]>(this.ROOT_URL + '/prisioneiros/listar').subscribe(items => {
          this.combo = items;
          this.combo.map(item => item.chave = 'cpf');
          this.comboChanges.emit(this.combo);
        });
        break;
      case 'servidores':
        this.http.get<any[]>(this.ROOT_URL + '/pavilhoes/listar').subscribe(items => {
          this.combo = items;
          this.combo.map(item => item.chave = 'cpf');
          this.comboChanges.emit(this.combo);
        });
        break;            
      default:
    }
  }
  /*
  getCheckMark() {
    switch(this.type) {
      case 'prisioneiros':
        this.http.get<any[]>(this.ROOT_URL + '/penas/listar').subscribe(items => {
          this.checkmark = items;
          this.checkmarkChanges.emit(this.checkmark);
        });
    }
  }
  */
  /*
  get(key:any) {
    switch(this.type) {
      case 'unidades':
        this.details = { codigo:10, nome:'hsud', rua:'asds', bairro:'asd', cidade:'asdsd', estado:'eew', cep:'1234' };
        break;
      case 'fornecedores':
        this.details = { cnpj:'10', nome_empresa:'123123', item_ofertado:'ddsda' };
        break;
      case 'pavilhões':
        this.details = { numero:10, funcao:'123213' };
        break;
      case 'blocos':
        this.details = { numero:10, andar:1 };
        break;
      case 'celas':
        this.details = { codigo:10, quantidade_max:3, tipo:'rew'};
        break;
      case 'prisioneiros':
        this.details = { cpf:'10', data_nascimento:'gfd', observacoes_medicas:'ertert', nome:'weqwe', rg:'vcsdfd' };
        break;
      case 'familiares':
        this.details = { cpf:'10', data_nascimento: 'qaxcss', rg:'ybhg', nome:'dcsf', parentesco:'vfvf' };
        break;
      case 'servidores':
        this.details = { cpf:'10', data_nascimento:'rertrtr', cargo:'sadasd', nome:'asd', salario:322 };;
        break;
      case 'penas':
        this.details = { codigo_penal:'10', area_judicial:'4545', descricao:'sadas', duracao_min:1, duracao_max:2 };
        break;            
      default:
    }
    return this.details;
  }
  get(key:any) {
    const type = this.type;
    let params = new HttpParams().set('userId', userid);
    switch(type) {
      case 'unidades':
        params.set('codigo', key);
        this.itemsObs = this.http.get<UnidadePrisional>(this.ROOT_URL + '/posts', {params});
        break;
      case 'fornecedores':
        params.set('cnpj', key);
        this.itemsObs = this.http.get<Fornecedor>(this.ROOT_URL + '/posts');
        break;
      case 'pavilhões':
        params.set('numero', key); ?????
        this.itemsObs = this.http.get<Pavilhao>(this.ROOT_URL + '/posts');
        break;
      case 'blocos':
        this.itemsObs = this.http.get<Bloco>(this.ROOT_URL + '/posts');
        break;
      case 'celas':
        this.itemsObs = this.http.get<Cela>(this.ROOT_URL + '/posts');
        break;
      case 'prisioneiros':
        this.itemsObs = this.http.get<Prisioneiro>(this.ROOT_URL + '/posts');
        break;
      case 'familiares':
        this.itemsObs = this.http.get<Familiar>(this.ROOT_URL + '/posts');
        break;
      case 'servidores':
       this.itemsObs = this.http.get<Servidor>(this.ROOT_URL + '/posts');
        break;
      case 'penas':
        this.itemsObs = this.http.get<Pena>(this.ROOT_URL + '/posts');
        break;            
      default:
    }
  }
  */
}