
import {switchMap,  map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import {Observable, of} from 'rxjs';


import {LOGIN_USER, LOGIN_USER_SUCCESS, LoginAction, FinishCookieClearence, LoginActionSuccess, EffectError, LOG_OUT} from '../actions/login.actions';
import { AppStates } from '../../../products/store/states/app.states';
import { LoginService } from '../../../core/services/login.service';
import { CartService } from '../../../core/services/cart.service';
import { CreateOrderNumber } from '../../../cart/store/actions/cart.actions';
import { AppCookieService } from '../../../core/services/cookie.service';
import {ProductDetails} from '../../../products/models/products.model';
import {GET_PRODUCT_DETAILS, GetProductDetailsSuccess} from '../../../products/store/actions/products.actions';
import { REGISTER_USER, RegisterUserSuccess } from '../actions/login.actions';
@Injectable()
export class LoginEffects {
  constructor(private loginActions$: Actions,
              private createOrder$: Actions,
              private logOut$: Actions,
              private loginService: LoginService,
              private cartService: CartService,
              private appCookieService: AppCookieService,
              private RegisterUserActions$: Actions,
              private store: Store<AppStates>) { }

  @Effect() Login$: Observable<any> = this.loginActions$.pipe(
      ofType(LOGIN_USER),
      switchMap((userCreds: any) =>  this.loginService.login(userCreds).pipe(
          map((loginData: any) => {
            return new LoginActionSuccess( loginData )
          }),
          catchError(err => of(new EffectError(err)))
        )
      )
    );
  @Effect() CreateOrder$: any = this.createOrder$.pipe(
      ofType(LOGIN_USER_SUCCESS),
      switchMap((userInfo: any) => this.cartService.getOrderNumber(userInfo).pipe(
          map((orderData: any) => new CreateOrderNumber( orderData )),
          catchError(err => of(new EffectError(err)))
        )
      )
    );

  @Effect() Logout$: any = this.logOut$.pipe(
      ofType(LOG_OUT),
      switchMap(() => this.appCookieService.logout().pipe(
          map(() => new FinishCookieClearence()),
          catchError(err => of(new EffectError(err)))
        )
      )
    );
  
  @Effect() RegisterUserEffect$: any = this.RegisterUserActions$.pipe(
      ofType(REGISTER_USER),
      switchMap((registerUserInfo: any) => this.loginService.register(registerUserInfo.payload).pipe(
          map((registrtionConfirmationData: any) => new RegisterUserSuccess(registrtionConfirmationData)),
          catchError(err => of(new EffectError(err)))
        )
      )
    );
}
