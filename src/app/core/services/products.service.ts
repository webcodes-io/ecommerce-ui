import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppCookieService } from './cookie.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProductsService {

  constructor(private http: Http,
              private appCookieService: AppCookieService) { }

  getAllProducts(): Observable<any> {
    const token = this.appCookieService.getTokenFromCookie();
    if (token) {
      const options = new RequestOptions();
      options.headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      });

      return this.http.get(
        environment.REST_API + '/rest/api/product/all', options
      ).map((res: Response) => res.json().products);
    }
  }

  /*** use if you need to make a call to get data for product details ***/
  getProductDetails(path: any) {
    const token = this.appCookieService.getTokenFromCookie();
    if (token) {
      const options = new RequestOptions();
      options.headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      });

      return this.http.get(
        environment.REST_API + `/rest/api/product/slug/${path.slug}`, options
      ).map((res: Response) => res.json());
    }

  }

  create(data?: any): Observable<any> {
    const token = this.appCookieService.getTokenFromCookie();
    if (token) {
      const options = new RequestOptions();
      options.headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      });

      return this.http.post(
        environment.REST_API + '/rest/api/product/add', data, options
      ).map((res: Response) => res);
    }
  }
}