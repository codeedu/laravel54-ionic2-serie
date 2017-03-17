import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Cart} from "../../providers/cart";
import {CheckoutPage} from "../checkout/checkout";

/*
  Generated class for the MyCart page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-cart',
  templateUrl: 'my-cart.html'
})
export class MyCartPage {

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public cart:Cart
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyCartPage');
  }

  goToCheckout(){
    this.navCtrl.push(CheckoutPage);
  }
}
