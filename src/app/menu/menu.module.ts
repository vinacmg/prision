import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsService } from '../items/items.service';
import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule
  ],
  providers: [ItemsService],
  exports: [MenuComponent]
})

export class MenuModule { }