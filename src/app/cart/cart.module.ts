import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { cartReducer } from './store/reducers/cart.reducers';
import { CartEffects } from './store/effects/cart.effects';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CartCheckoutComponent } from './components/cart-checkout/cart-checkout.component';
import {StoreModule} from "@ngrx/store";
import { ModalModule } from 'ngx-bootstrap/modal';

const routes: Routes = [
  {path: 'cart', component: CartDetailsComponent},
  // {path: 'delivery', component: undefined},
  {path: 'checkout', component: CartCheckoutComponent}
];

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forRoot([CartEffects]),
    StoreModule.forFeature('cartReducer', cartReducer),
    RouterModule.forChild(routes),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CartDetailsComponent,
    CartCheckoutComponent
  ]
})
export class CartModule { }
