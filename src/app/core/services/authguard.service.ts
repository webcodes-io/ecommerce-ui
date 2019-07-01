import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {Observable, of} from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppCookieService } from './cookie.service';
import {Store} from "@ngrx/store";
import {AppStates} from "../../products/store/states/app.states";
import {catchError, map} from 'rxjs/operators';
import {EffectError} from "../../products/store/actions/products.actions";
import {LoginActionSuccess} from "../../auth/store/actions/login.actions";

@Injectable()
export class AuthguardService implements CanActivate {
  static jwtHelper: JwtHelperService = new JwtHelperService();
  constructor(
    private appCookieService: AppCookieService,
    private router: Router,
    private store: Store<AppStates>,
  ) { }

  canActivate(): boolean {

    let loggedIn: boolean;
    let userDetailsInStore: any;

    /*** 1. Check token in store (token is lost on page refresh) ***/
    this.store.select( states => {
      return states['userLoginReducer']
    }).pipe(
        map(( data: any) => {
        return data['userDetails'];
      }),
        catchError(err => {
          return undefined;
        })
      )
      .subscribe((data:any) => {
        userDetailsInStore = data;
      });
    /*** End: Check if has data in store (may lose on refresh) ***/

    if(userDetailsInStore && !AuthguardService.jwtHelper.isTokenExpired(userDetailsInStore.token)) {
      loggedIn = true;
    } else if(this.getUserDetails() && this.getUserDetails()['token'] && !AuthguardService.jwtHelper.isTokenExpired(this.getUserDetails()['token'])) {
      let userDetails = this.getUserDetails();
      this.store.dispatch(
        new LoginActionSuccess( {
          token: userDetails.token,
          userName: userDetails.userName,
          id: userDetails.id,
          orderNumber: userDetails.orderNumber,
          mobile: undefined
        })
      );
      loggedIn = true;
    } else {
      this.router.navigate(['/logout']);
      loggedIn = false;
    }
    return loggedIn;
  }


  getUserDetails() {
    /*** 1. Get token in cookies ***/
    let token = this.appCookieService.getTokenFromCookie();
    let userName = this.appCookieService.getUserNameFromCookie();
    let userId = this.appCookieService.getUserIdFromCookie();
    let orderNumber = this.appCookieService.getOrderNumberFromCookie();
    let userDetails: any;

    if(token && userName && userId && orderNumber) {
      userDetails = {
        token : token,
        userName : userName,
        id : userId,
        orderNumber : orderNumber
      }
    } else {
      userDetails = {};
    }

    return userDetails;

  }

}
