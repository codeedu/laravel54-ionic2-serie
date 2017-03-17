import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {Page1} from '../pages/page1/page1';
import {Page2} from '../pages/page2/page2';
import {ProductListPage} from "../pages/product-list/product-list";
import {ProductDetailPage} from "../pages/product-detail/product-detail";
import {LoginPage} from "../pages/login/login";
import {MyCartPage} from "../pages/my-cart/my-cart";
import {CheckoutPage} from "../pages/checkout/checkout";
import {Cart} from "../providers/cart";

@NgModule({
    declarations: [
        MyApp,
        Page1,
        Page2,
        ProductListPage,
        ProductDetailPage,
        LoginPage,
        MyCartPage,
        CheckoutPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        Page1,
        Page2,
        ProductListPage,
        ProductDetailPage,
        LoginPage,
        MyCartPage,
        CheckoutPage
    ],
    providers: [
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        Cart
    ]
})
export class AppModule {
}
