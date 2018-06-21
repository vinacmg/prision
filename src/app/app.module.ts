import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuModule } from './menu/menu.module';
import { DetailsModule } from './details/details.module';
import { NewItemComponent } from './new-item/new-item.component';
import { ItemsModule } from './items/items.module';

@NgModule({
  declarations: [
    AppComponent,
    NewItemComponent
  ],
  imports: [
    BrowserModule,
    MenuModule,
    ItemsModule,
    DetailsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
