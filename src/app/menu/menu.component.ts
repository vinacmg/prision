import { Component, OnInit, Input } from '@angular/core';
import { ItemsService } from '../items/items.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  active: string;

  constructor(private itemsService: ItemsService) { }

  ngOnInit() {
    this.itemsService.change.subscribe(type => {
      this.active = type;
    });
  }

  select(option:string) {
    this.itemsService.setType(option);
  }

  setActive(active) {
    this.active = active;
  }

}
