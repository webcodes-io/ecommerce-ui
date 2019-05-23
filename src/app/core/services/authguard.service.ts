import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AppCookieService } from './cookie.service';

@Injectable()
export class AuthguardService implements CanActivate {
  static jwtHelper: JwtHelper = new JwtHelper();
  constructor(
    private appCookieService: AppCookieService
  ) { }

  canActivate(): boolean {
    let token = this.appCookieService.getTokenFromCookie();
    let loggedIn: boolean;
    if(token) {
      loggedIn = !AuthguardService.jwtHelper.isTokenExpired(token);
    } else {
      loggedIn = false;
    }
    return loggedIn;
  }

}
