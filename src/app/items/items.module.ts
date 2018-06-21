import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items.component';
import { ItemsService } from './items.service';

@NgModule({
  declarations: [ItemsComponent],
  imports: [
    CommonModule
  ],
  providers: [ItemsService],
  exports: [ItemsComponent]
})

export class ItemsModule { }
