import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the Cart provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Cart {
  public items = [];
  public total = 0;

  addItem(item){
    this.items.push(item);
    this.calculateTotal();
  }

  calculateTotal(){
    let total = 0;
    this.items.forEach((item) => {
      total = total + Number(item.value);
    });
    this.total = total;
  }

}
