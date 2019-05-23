import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppCookieService } from './cookie.service';

import { environment } from '../../../environments/environment';

@Injectable()
export class CartService {

  constructor(private http: Http,
              private appCookieService: AppCookieService) { }

  getOrderNumber(data: any): Observable<any> {
    const token = this.appCookieService.getTokenFromCookie();
    if (token) {
      const options = new RequestOptions();
      options.headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      });

      return this.http.post(
        environment.REST_API + '/rest/api/order/add', { 'userId': data.payload.id }, options
      ).map((res: Response) => {
        const respObj = res.json();
        this.appCookieService.storeOrderNumberInCookie(respObj);
        return respObj;
      });
    }
  }

  addProductToShoppingCart(data: any): Observable<any> {
    const token = this.appCookieService.getTokenFromCookie();
    const orderNumber = this.appCookieService.getOrderNumberFromCookie();
    if (token && orderNumber) {
      const options = new RequestOptions();
      options.headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      });

      return this.http.post(
        environment.REST_API + `/rest/api/item/add/${orderNumber}`, 
        { 
          'quantity' : data.payload.quantity,
          'productId': data.payload.id
        },
        options
      ).map((res: Response) => {
        const respObj = res.json();
        return respObj;
      });
    }
  }
  productsShoppingCart(): Observable<any> {
    const token = this.appCookieService.getTokenFromCookie();
    const orderNumber = this.appCookieService.getOrderNumberFromCookie();
    if (token && orderNumber) {
      const options = new RequestOptions();
      options.headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      });

      return this.http.get(
        environment.REST_API + `/rest/api/order/number/${orderNumber}`,
        options
      ).map((res: Response) => {
        const respObj = res.json();
        return respObj;
      });
    }
  }
  checkoutShoppingCart(paymentInfo: any) {
    // order_token is not used yet
    const order_token = null;
    const token = this.appCookieService.getTokenFromCookie();
    const orderNumber = this.appCookieService.getOrderNumberFromCookie();
    console.log('paymentInfo: ', paymentInfo);
    if (token && orderNumber) {
      const options = new RequestOptions();
      options.headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      });

      return this.http.post(
        environment.REST_API + `/rest/api/order/number/${orderNumber}/makePayment?order_token=${order_token}`, 
        {
            payment_method_id : paymentInfo.payment_method_id,
            amount: paymentInfo.amount
        },
        options
      ).map((res: Response) => {
        const respObj = res.json();
        return respObj;
      });
    }
    
  }

  getMethodsOfPayment() {
    const token = this.appCookieService.getTokenFromCookie();
    const orderNumber = this.appCookieService.getOrderNumberFromCookie();
    
    if (token && orderNumber) {
      const options = new RequestOptions();
      options.headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      });

      return this.http.get(
        environment.REST_API + `/rest/api/payment/all`, 
        options
      ).map((res: Response) => {
        const respObj = res.json();
        return respObj;
      });
    }
    
  }

}
