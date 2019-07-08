import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppCookieService } from './cookie.service';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import {removeProductId} from "../../products/models/products.model";

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient,
              private appCookieService: AppCookieService) { }

  getAllProducts(): Observable<any> {
    const token = this.appCookieService.getTokenFromCookie();
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      });
      const options = {
        headers: headers
      };
      return this.http.get(
        environment.REST_API + '/rest/api/product/all', options
      ).pipe(
        map((res: any) => res.products)
      );
    }
  }

  /*** use if you need to make a call to get data for product details ***/
  getProductDetails(path: any) {
    const token = this.appCookieService.getTokenFromCookie();
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      });
      const options = {
        headers: headers
      };
      return this.http.get(
        environment.REST_API + `/rest/api/product/slug/${path.slug}`, options
      ).pipe(
        map((res: any) => res)
      )
    }

  }

  create(data?: any): Observable<any> {
    const token = this.appCookieService.getTokenFromCookie();
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      });
      const options = {
        headers: headers
      };

      return this.http.post(
        environment.REST_API + '/rest/api/product/add', data, options
      ).pipe(
        map((res: any) => res)
      );
    }
  }

  uploadProductImage(imageDetails: {file: File, productId: number}): Observable<any> {

    const token = this.appCookieService.getTokenFromCookie();
    const uploadImage = new FormData();

    uploadImage.append('uploads[]', imageDetails['file'], imageDetails['file']['name']);

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });
      const options = {
        headers: headers
      };

      return this.http.post(
        environment.REST_API + `/rest/api/image/add/${imageDetails.productId}`, uploadImage, options
      ).pipe(
        map((res: any) => res)
      );
    }
  }

  remove(removeProductId?: removeProductId): Observable<any> {

    const token = this.appCookieService.getTokenFromCookie();
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      });
      const options = {
        headers: headers
      };

      return this.http.delete(
        `${environment.REST_API}/rest/api/product/delete/${removeProductId.id}`, options
      ).pipe(
        map((res: any) => res)
      );
    }
  }
}
