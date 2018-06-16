import { Component, OnInit, Input } from '@angular/core';
import { ItemsComponent } from '../items/items.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() items: ItemsComponent;

  active: string;

  constructor() { }

  ngOnInit() {
    this.select('unidades')
  }

  select(option:string) {
    this.active = option;
    this.items.setType(option);
  }

}
