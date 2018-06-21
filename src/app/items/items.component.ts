import { Component, OnInit, Input } from '@angular/core';
import { DetailsComponent } from '../details/details.component';
import { Observable } from 'rxjs';
import { ItemsService } from './items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  @Input() details: DetailsComponent;

  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com';

  type: string = 'unidades';

  active: any;
  //items:Observable<any[]>;
  
  items:Array<any> = [{
    chave: 'artigo_penal',
    artigo_penal:555,
    area_judicial:10,
    descricao:'bonito',
    duracao_min:5,
    duracao_max:10
  }, {
    chave: 'artigo_penal',
    artigo_penal:564,
    area_judicial:12,
    descricao:'feio',
    duracao_min:5,
    duracao_max:10
  },{
    chave: 'artigo_penal',
    artigo_penal:789,
    area_judicial:10,
    descricao:'bonito',
    duracao_min:5,
    duracao_max:10
  }, {
    chave: 'artigo_penal',
    artigo_penal:223,
    area_judicial:12,
    descricao:'feio',
    duracao_min:5,
    duracao_max:10
  }]
  
  constructor(
    private itemsService: ItemsService
  ) { }

  ngOnInit() {
    this.itemsService.change.subscribe(type => {
      this.type = type;
    });
    this.itemsService.itemChanges.subscribe(items => {
      this.items = items;
    })
  }

  select(item:any) {
    this.active = item;
    
    this.details.setAddingItem(false);

    switch(this.type) {
      case 'unidades':
        this.details.set(this.active.chave);      
        break;
      case 'fornecedores':
        this.details.set(this.active.chave);   
        break;
      case 'pavilhões':
        this.details.set(this.active.chave);    
        break;
      case 'blocos':
        this.details.set(this.active.chave);
        break;
      case 'celas':
        this.details.set(this.active.chave);     
        break;
      case 'prisioneiros':
        this.details.set(this.active.chave);     
        break;
      case 'familiares':
        this.details.set(this.active.chave);     
        break;
      case 'servidores':
        this.details.set(this.active.chave);     
        break;
      case 'penas':
        this.details.set(this.active.chave);     
        break;            
      default:
    }
  }

  newItem() {
    this.active = '';
    this.details.setAddingItem(true);
  }

}
