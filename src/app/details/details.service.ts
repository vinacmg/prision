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
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(
    private itemsService: ItemsService, 
    private http: HttpClient 
  ) { 
    this.itemsService.change.subscribe(type => {
      this.type = type;
    });
    this.ROOT_URL  = itemsService.ROOT_URL;//Entidade no plural/criar, alterar, listar, buscar, remover
  }

  add(item: any) {
    /*
    let params = new HttpParams().set('nome', 'teste2')
    .set('tipo_logradouro', 'teste2')
    .set('logradouro', 'teste2')
    .set('num', '12')
    .set('bairro', 'teste2')
    .set('cep', '111')
    .set('cidade', 'teste2')
    .set('uf', 'teste2');
    */
    let httpParams = new HttpParams();
    Object.keys(item).forEach(function (key) {
        httpParams = httpParams.append(key, item[key]);
    });

    switch(this.type) {
      case 'unidades':
        this.http.post(this.ROOT_URL + '/unidades/criar', httpParams).subscribe(resp => {
          console.log(resp);
          this.itemsService.getItems();
        });
        break;
      case 'fornecedores':
        this.http.post(this.ROOT_URL + '/fornecedores/criar', httpParams).subscribe(resp => {
          console.log(resp);
          this.itemsService.getItems();
        });
        break;
      case 'pavilhões':
        this.http.post<any>(this.ROOT_URL + '/pavilhoes/criar', httpParams).subscribe(resp => {
          console.log(resp);
          this.itemsService.getItems();
        });
        break;
      case 'blocos':
        /*let custom = new HttpParams().set('fk_codigo_unidade', item['chave'].slice(-1)[0])
          .set('fk_numero_pavilhao', item['chave'][0])
          .set('numero', item['numero'])
          .set('andar', item['andar']);
        */
        let custom = {
          "fk_codigo_unidade":item['chave'].slice(-1)[0],
          "fk_numero_pavilhao":item['chave'][0],
          "numero":item['numero'],
          "andar":item['andar']
        };
        this.http.post<any>(this.ROOT_URL + '/blocos/criar', custom, this.httpOptions).subscribe(resp => {
          console.log(resp);
          this.itemsService.getItems();
        });
        break;
      case 'celas':
        this.http.post<any>(this.ROOT_URL + '/celas/criar', httpParams).subscribe(resp => {
          console.log(resp);
          this.itemsService.getItems();
        });
        break;
      case 'prisioneiros':
        this.http.post<any>(this.ROOT_URL + '/prisioneiros/criar', httpParams).subscribe(resp => {
          console.log(resp);
          this.itemsService.getItems();
        });
        break;
      case 'familiares':
        this.http.post<any>(this.ROOT_URL + '/familiares/criar', httpParams).subscribe(resp => {
          console.log(resp);
          this.itemsService.getItems();
        });
        break;
      case 'servidores':
        this.http.post<any>(this.ROOT_URL + '/servidores/criar', httpParams).subscribe(resp => {
          console.log(resp);
          this.itemsService.getItems();
        });
        break;
      case 'penas':
        this.http.post<any>(this.ROOT_URL + '/penas/criar', httpParams).subscribe(resp => {
          console.log(resp);
          this.itemsService.getItems();
        });
        break;            
      default:
    }
  }

  alter(item) {
    let httpParams = new HttpParams();
    Object.keys(item).forEach(function (key) {
        httpParams = httpParams.append(key, item[key]);
    });

    switch(this.type) {
      case 'unidades':
        this.http.post(this.ROOT_URL + '/unidades/alterar', httpParams).subscribe(resp => {
          console.log(resp);
        });
        break;
      case 'fornecedores':
        this.http.post(this.ROOT_URL + '/fornecedores/alterar', httpParams).subscribe(resp => {
          console.log(resp);
        });
        break;
      case 'pavilhões':
        let pav = new HttpParams().set('numero',item['numero'])
          .set('funcao',item['funcao'])
          .set('fk_unid_prisional', item['fk_unid_prisional']);
        this.http.post<any>(this.ROOT_URL + '/pavilhoes/alterar', pav).subscribe(resp => {
          console.log(resp);
        });
        break;
      case 'blocos':
        let bloco = new HttpParams().set('fk_codigo_unidade', item['fk_codigo_unidade'])
          .set('fk_numero_pavilhao', item['fk_numero_pavilhao'])
          .set('numero', item['numero'])
          .set('andar', item['andar']);
        this.http.post<any>(this.ROOT_URL + '/blocos/alterar', bloco).subscribe(resp => {
          console.log(resp);
        });
        break;
      case 'celas':
        let cela = new HttpParams().set('fk_numero_bloco', item['fk_numero_bloco'])
          .set('fk_numero_pavilhao', item['fk_numero_pavilhao'])
          .set('codigo', item['codigo'])
          .set('quantidade_max', item['quantidade_max'])
          .set('tipo', item['tipo']);
        this.http.post<any>(this.ROOT_URL + '/celas/alterar', cela).subscribe(resp => {
          console.log(resp);
        });
        break;
      case 'prisioneiros':
        let prisioneiro = new HttpParams().set('cpf', item['cpf'])
          .set('rg', item['rg'])
          .set('nome', item['nome'])
          .set('data_nascimento', item['data_nascimento'])
          .set('observacoes_medicas', item['observacoes_medicas']);
        this.http.post<any>(this.ROOT_URL + '/prisioneiros/alterar', prisioneiro).subscribe(resp => {
          console.log(resp);
        });
        break;
      case 'familiares':
        let familiar = new HttpParams().set('cpf', item['cpf_familiar'])
          .set('rg', item['rg_familiar'])
          .set('nome', item['nome_familiar'])
          .set('data_nascimento', item['data_nascimento_familiar'])
          .set('parentesco', item['parentesco_familiar']);
        this.http.post<any>(this.ROOT_URL + '/familiares/alterar', familiar).subscribe(resp => {
          console.log(resp);
        });
        break;
      case 'servidores':
        let servidor = new HttpParams().set('data_nascimento', item['data_nascimento'])
          .set('cargo', item['cargo'])
          .set('nome', item['nome'])
          .set('salario', item['salario'])
          .set('cpf', item['cpf']);
        this.http.post<any>(this.ROOT_URL + '/servidores/alterar', servidor).subscribe(resp => {
          console.log(resp);
        });
        break;
      case 'penas':
        this.http.post<any>(this.ROOT_URL + '/penas/alterar', httpParams).subscribe(resp => {
          console.log(resp);
        });
        break;            
      default:
    }
    this.itemsService.getItems();
  }

  delete(item) {
    let httpParams = new HttpParams();
    Object.keys(item).forEach(function (key) {
        httpParams = httpParams.append(key, item[key]);
    });

    switch(this.type) {
      case 'unidades':
        this.http.post(this.ROOT_URL + '/unidades/remover', httpParams).subscribe(resp => {
          console.log(resp);
        });
        break;
      case 'fornecedores':
        this.http.post(this.ROOT_URL + '/fornecedores/remover', httpParams).subscribe(resp => {
          console.log(resp);
        });
        break;
      case 'pavilhões':
        let pav = new HttpParams().set('numero',item['numero'])
          .set('fk_unid_prisional', item['fk_unid_prisional']);
        this.http.post<any>(this.ROOT_URL + '/pavilhoes/remover', pav).subscribe(resp => {
          console.log(resp);
        });
        break;
        
      case 'blocos':
        let bloco = new HttpParams()
          .set('fk_numero_pavilhao', item['fk_numero_pavilhao'])
          .set('numero', item['numero']);
        this.http.post<any>(this.ROOT_URL + '/blocos/remover', bloco).subscribe(resp => {
          console.log(resp);
        });
        break;
      case 'celas':
        let cela = new HttpParams()
          .set('codigo', item['codigo'])
        this.http.post<any>(this.ROOT_URL + '/celas/remover', cela).subscribe(resp => {
          console.log(resp);
        });
        break;
      case 'prisioneiros':
        let prisioneiro = new HttpParams()
          .set('cpf', item['cpf'])
        this.http.post<any>(this.ROOT_URL + '/prisioneiros/remover', prisioneiro).subscribe(resp => {
          console.log(resp);
        });
        break;
      case 'familiares':
        let familiar = new HttpParams()
          .set('cpf', item['cpf'])
          .set('fk_prisioneiro', item['fk_prisioneiro'])
        this.http.post<any>(this.ROOT_URL + '/familiares/remover', familiar).subscribe(resp => {
          console.log(resp);
        });
        break;
      case 'servidores':
        this.http.post<any>(this.ROOT_URL + '/servidores/remover', httpParams).subscribe(resp => {
          console.log(resp);
        });
        break;
      case 'penas':
        this.http.post<any>(this.ROOT_URL + '/penas/remover', httpParams).subscribe(resp => {
          console.log(resp);
        });
        break;            
      default:
    }

    this.itemsService.getItems();
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
        this.http.get<any>(this.ROOT_URL + '/pavilhoes/buscar', {params: new HttpParams().set('fk_unidade_prisional', item['fk_unid_prisional']).set('numero', item['numero'])}).subscribe(details => {
          this.details = details;
          this.detailsChanges.emit(this.details);
        });
        break;
      case 'blocos':
        console.log(item['numero']);
        console.log(item['fk_numero_pavilhao']);
        this.http.get<any>(this.ROOT_URL + '/blocos/buscar', {params: new HttpParams().set('fk_numero_pavilhao', item['fk_numero_pavilhao']).set('numero', item['numero'])}).subscribe(details => {
          this.details = details;
          console.log(details);
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