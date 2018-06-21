import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsService } from '../items/items.service';
import { DetailsComponent } from './details.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DetailsService } from './details.service';

@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ItemsService, DetailsService],
  exports: [DetailsComponent]
})

export class DetailsModule { }