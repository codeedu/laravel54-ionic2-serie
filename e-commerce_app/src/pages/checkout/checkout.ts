import {Component, ChangeDetectorRef} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Cart} from "../../providers/cart";
import 'rxjs/add/operator/toPromise';
import {Http, Headers, RequestOptions} from "@angular/http";

declare var PagSeguroDirectPayment;
/*
  Generated class for the Checkout page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html'
})
export class CheckoutPage {
  public creditCard = {
    num: '',
    cvv: '',
    monthExp: '',
    yearExp: '',
    brand: '',
    token: ''
  };

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public cart:Cart,
      public http: Http,
      public ref:ChangeDetectorRef
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }

  paymentCreditCard(){
    this.getSession();
  }

  getSession(){
    let headers = new Headers();
    headers.set('Authorization', `Bearer ${window.localStorage['token']}`);
    let requestOptions = new RequestOptions({headers});
    this.http.get('http://localhost:8000/api/session',requestOptions)
        .toPromise().then((response) => {
      PagSeguroDirectPayment.setSessionId(response.json().session_id);
      this.getBrandFromNum();
    })
  }

  getBrandFromNum(){
    PagSeguroDirectPayment.getBrand({
      cardBin: this.creditCard.num.substring(0,6),
      success: response => {
        this.creditCard.brand = response.brand.name;
        this.ref.detectChanges();
        this.getTokenFromCreditCard();
      }
    })
  }

  getTokenFromCreditCard(){
    PagSeguroDirectPayment.createCardToken({
      cardNumber: this.creditCard.num,
      brand: this.creditCard.brand,
      cvv: this.creditCard.cvv,
      expirationMonth: this.creditCard.monthExp,
      expirationYear: this.creditCard.yearExp,
      success: response => {
        this.creditCard.token = response.card.token;
        this.ref.detectChanges();
        this.sendPayment();
      }
    })
  }

  sendPayment(){
    let headers = new Headers();
    headers.set('Authorization', `Bearer ${window.localStorage['token']}`);
    let requestOptions = new RequestOptions({headers});
    this.http.post('http://localhost:8000/api/order', {
      items: this.cart.items,
      token: this.creditCard.token,
      hash: PagSeguroDirectPayment.getSenderHash(),
      total: this.cart.total
    }, requestOptions)
        .toPromise().then(response => console.log(response));
  }

}
