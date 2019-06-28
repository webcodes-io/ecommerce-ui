import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppCookieService } from './cookie.service';

@Injectable()
export class AuthguardService implements CanActivate {
  static jwtHelper: JwtHelperService = new JwtHelperService();
  constructor(
    private appCookieService: AppCookieService,
    private router: Router
  ) { }

  canActivate(): boolean {
    let token = this.appCookieService.getTokenFromCookie();
    let loggedIn: boolean;
    if(token) {
      // TODO: added "exp" property
      // loggedIn = !AuthguardService.jwtHelper.isTokenExpired(token);
      loggedIn = true;
    } else {
      loggedIn = false;

    }
    return loggedIn;
  }

}
