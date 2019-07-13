import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { TranslateModule } from '@ngx-translate/core';
import { LoginService } from './services/login.service';
import { ProductsService } from './services/products.service';
import { CartService } from './services/cart.service';
import { AppCookieService } from './services/cookie.service';
import { AuthguardService } from './services/authguard.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  exports: [
    TranslateModule
  ],
  providers: [
    LoginService,
    ProductsService,
    CartService,
    AppCookieService,
    CookieService,
    AuthguardService
  ]
})
export class CoreModule { }
