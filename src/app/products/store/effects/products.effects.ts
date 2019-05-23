import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { map, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/switchMap';
import { GET_PRODUCTS, GET_PRODUCT_DETAILS, CREATE_NEW_PRODUCT,
  GetProductDetails, GetProductsSuccess, GetProductDetailsSuccess, CreateNewProductSuccess,
  EffectError } from '../actions/products.actions';
import { Observable } from 'rxjs/Observable';
import { ProductDetails } from '../../models/products.model';

import { AppStates } from '../states/app.states';
import {ProductsService} from '../../../core/services/products.service';

/**
 * 1.  inside 'map((data)' no need of an additional 'dispatch' it dispatches action GetProductsSuccess
 */

@Injectable()
export class ProductsEffects {
  constructor(private actions$: Actions,
              private getDetailsActions$: Actions,
              private productService: ProductsService,
              private CreateNewProductActions$: Actions,
              private store: Store<AppStates>){}

  @Effect() Products$: any = this.actions$
    .ofType(GET_PRODUCTS)
    .switchMap(() => this.productService.getAllProducts()).pipe(
      map((data: any) => new GetProductsSuccess( data )),
      catchError(err => of(new EffectError()))
    );

  @Effect() GetProductDetail$: any = this.getDetailsActions$
    .ofType(GET_PRODUCT_DETAILS)
    // .map((data: any) => new GetProductDetailsSuccess(data.payload));
    .switchMap((action: Action) => this.productService.getProductDetails(action.payload)).pipe(
      map((data: ProductDetails) => new GetProductDetailsSuccess(data)),
       catchError(err => of(new EffectError()))
    );

  @Effect() CreateNewProduct$: any = this.CreateNewProductActions$
    .ofType(CREATE_NEW_PRODUCT)
    .switchMap((productDetails: any) => this.productService.create(productDetails.payload))
    .pipe(
      map( (res: any) => new CreateNewProductSuccess(res) ),
      catchError(err => of(new EffectError()))
      );


}
