import { Injectable, Output, EventEmitter } from "@angular/core";

@Injectable()
export class DetailsService {

  @Output() detailsChanges: EventEmitter<any> = new EventEmitter();

  items:any;

  constructor() { }

}