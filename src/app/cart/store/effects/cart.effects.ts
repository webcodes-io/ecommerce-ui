import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { Store, Action } from "@ngrx/store";
import { of } from 'rxjs/observable/of';
import { map, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/switchMap';
import { ADD_TO_CART, ADD_TO_CART_SUCCESS, 
    GET_CURRENT_ORDER_FROM_STORE,
    CHECK_OUT,
    AddToCart, AddToCartSuccess, StoreCurrentOrder, 
    GetCurrentOrderFromStoreSuccess, CheckOutSuccess } from '../actions/cart.actions';
import { Observable } from 'rxjs/Observable';
//TODO: need to add order models

import { CartService } from '../../../core/services/cart.service'; 
import { AppStates } from '../../../products/store/states/app.states';
import {ProductsService} from "../../../core/services/products.service";

@Injectable()
export class CartEffects {
  constructor(private addToCartAction$ : Actions,
              private checkoutShoppingCartAtion$: Actions,
              private saveProductsInStoreAPIAction$: Actions,
              private getOrdersFromtStoreAction$ : Actions,
              private productService: ProductsService,
              private store: Store<AppStates>,
              private cartService: CartService){}
    // Add to cart
  @Effect() addToCart$: any = this.addToCartAction$
    .ofType(ADD_TO_CART)
    .switchMap((productToCart: any) => this.cartService.addProductToShoppingCart(productToCart))
    .pipe(
        map((data: any) => new AddToCartSuccess( data )),
        //TODO: need to replace with Error action:
        catchError(err => of(new Error('error')))
    )
  @Effect() saveProductsInStoreAPI$: any = this.saveProductsInStoreAPIAction$
    .ofType(ADD_TO_CART_SUCCESS)
    .switchMap((productToCart: any) => this.cartService.productsShoppingCart())
    .pipe(
        map((data: any) => new StoreCurrentOrder( data )),
        //TODO: need to replace with Error action:
        catchError(err => of(new Error('error')))
    )
    // get order from store
   @Effect() getOrdersFromtStore$: any = this.getOrdersFromtStoreAction$
    .ofType(GET_CURRENT_ORDER_FROM_STORE)
    .map((data: any) => new GetCurrentOrderFromStoreSuccess(data));

   // make payment
   @Effect() checkoutShoppingCart$: any = this.checkoutShoppingCartAtion$
    .ofType(CHECK_OUT)
    .switchMap((orderPaymentDetails: any) => this.cartService.checkoutShoppingCart(orderPaymentDetails.payload))
    .pipe(
        map((data: any) => new CheckOutSuccess( data )),
        catchError(err => of(new Error('error')))
    );
}