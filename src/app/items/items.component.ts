import { Component, OnInit, Input } from '@angular/core';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  @Input() details: DetailsComponent;

  type: string;
  active: string;

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

  constructor() { }

  ngOnInit() {
  }

  select(key:string) {
    this.active = key;
    this.details.set(key, this.type);
    this.details.setAddingItem(false);
  }

  setType(type:string) {
    this.type = type;
  }

  newItem() {
    this.active = '';
    this.details.setAddingItem(true);
  }
}
