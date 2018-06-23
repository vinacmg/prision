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


  type: string;
  showItems: boolean = false;
  posTitle: string = '';

  active: any;
  
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
      this.posTitle = '';
      this.active = '';
      this.showItems = true;
    });
    this.itemsService.itemChanges.subscribe(items => {
      this.items = items;
    })
    this.itemsService.fatherChanges.subscribe(father => {
      this.posTitle = father;
    })
  }

  select(item:any) {
    this.active = item;
    
    this.details.setAddingItem(false);
    this.details.showDetails = true;

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
    this.details.clear();
    this.details.showDetails = true;
    this.details.setAddingItem(true);
  }

}
