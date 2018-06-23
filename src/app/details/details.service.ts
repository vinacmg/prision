import { Injectable, Output, EventEmitter } from "@angular/core";
import { ItemsService } from "../items/items.service";

@Injectable()
export class DetailsService {

  @Output() detailsChanges: EventEmitter<any> = new EventEmitter();

  details:any;
  type:string;

  constructor(private itemsService: ItemsService) { 
    this.itemsService.change.subscribe(type => {
      this.type = type;
    });
  }

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
  /*
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