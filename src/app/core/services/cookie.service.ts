import { Injectable } from '@angular/core';
// import { CookieService } from 'ngx-cookie';
import { CookieService } from 'ngx-cookie-service';
 
@Injectable()
export class AppCookieService {
  constructor(
    private cookieService: CookieService
  ) {}
  public logout(): any {
    this.cookieService.delete('token');
    this.cookieService.delete('userId');
    this.cookieService.delete('orderId');
    this.cookieService.delete('orderNumber');
    this.cookieService.delete('userName');
  }

  public storeTokenInCookie(data: any): void {
    this.cookieService.set('token', data.token);
    this.cookieService.set('userId', data.id);
    this.cookieService.set('userName', data.userName );
  }

  public storeOrderNumberInCookie(data: any): void {
    this.cookieService.set('orderNumber', data.orderNumber);
    this.cookieService.set('orderId', data.id);
  }

  public getTokenFromCookie(): any {
    return this.cookieService.get('token');
  }
  public getUserNameFromCookie(): any {
    return this.cookieService.get('userName');
  }
  public getOrderNumberFromCookie(): any {
    return this.cookieService.get('orderNumber');
  }
  public getUserIdFromCookie(): any {
    return this.cookieService.get('userId');
  }
}
