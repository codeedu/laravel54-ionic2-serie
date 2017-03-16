import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {Page1} from '../pages/page1/page1';
import {Page2} from '../pages/page2/page2';
import {ProductListPage} from "../pages/product-list/product-list";
import {ProductDetailPage} from "../pages/product-detail/product-detail";

@NgModule({
    declarations: [
        MyApp,
        Page1,
        Page2,
        ProductListPage,
        ProductDetailPage
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
        ProductDetailPage
    ],
    providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}
