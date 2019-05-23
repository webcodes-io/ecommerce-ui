import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { AppCookieService } from './cookie.service';
import { environment } from '../../../environments/environment';
@Injectable()
export class LoginService {

  constructor(private http: Http,
              private appCookieService: AppCookieService) { }

  login(data?: any): Observable<any> {
    const options = new RequestOptions();
    options.headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post(
      environment.REST_API + '/rest/login/', data.payload, options
    ).map((res: Response) => {
      this.appCookieService.storeTokenInCookie(res.json());
      return res.json();
    });
  }
  
  register(data?: any): Observable<any> {
    const options = new RequestOptions();
    options.headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post(
      environment.REST_API + '/rest/login/register', data, options
    ).map((res: Response) => {
      return res.json();
    });
  }

}
