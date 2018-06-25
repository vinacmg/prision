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
  
  items:Array<any> = []
  
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
    this.details.set(this.active);
  }

  newItem() {
    this.active = '';
    this.details.clear();
    this.details.showDetails = true;
    this.details.setAddingItem(true);
    this.details.new = true;
  }

}
