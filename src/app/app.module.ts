import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { INITIAL_STORE_DATA } from './products/store/states/app.states';
import { AppComponent } from './app.component';
import { ProductsModule } from './products/products.module';
import { CoreModule } from './core/core.module';
import { LoginModule } from './auth/login.module';
import { LayoutModule } from './layout/layout.module';
import { CartModule } from './cart/cart.module';
import { reducer } from './app.reducers';
import { CollapseModule } from "ngx-bootstrap/collapse";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// no need to place actions to providers:

/**
 * 1. Actions are not registered inside 'providers'
 * 2. INITIAL_STORE_DATA has storeData state
 * 3. reducer fun and INITIAL_STORE_DATA const are registered in StoreData
 * 4. Effect class is registered inside EffectModule
 **/
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductsModule,
    LoginModule,
    CoreModule,
    LayoutModule,
    CartModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    StoreModule.forRoot(reducer, INITIAL_STORE_DATA)
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
