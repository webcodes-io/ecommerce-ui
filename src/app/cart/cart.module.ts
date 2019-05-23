import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CartEffects } from './store/effects/cart.effects';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CartCheckoutComponent } from './components/cart-checkout/cart-checkout.component';
const routes: Routes = [
  {path: 'cart', component: CartDetailsComponent},
  // {path: 'delivery', component: undefined},
  {path: 'checkout', component: CartCheckoutComponent}
];

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.run(CartEffects),
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CartDetailsComponent,
    CartCheckoutComponent
  ]
})
export class CartModule { }
