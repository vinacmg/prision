import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ItemsComponent } from './items/items.component';
import { DetailsComponent } from './details/details.component';
import { NewItemComponent } from './new-item/new-item.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ItemsComponent,
    DetailsComponent,
    NewItemComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
