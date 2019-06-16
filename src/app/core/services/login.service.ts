import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppCookieService } from './cookie.service';
import { environment } from '../../../environments/environment';
@Injectable()
export class LoginService {

  constructor(private http: HttpClient,
              private appCookieService: AppCookieService) { }

  login(data?: any): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {
      headers: headers
    };

    return this.http.post<Observable<any>>(
      environment.REST_API + '/rest/login/', data.payload, options
    ).pipe(
        map((res: any) => {
            this.appCookieService.storeTokenInCookie(res);
            return res;
        })
    );
  }
  
  register(data?: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {
      headers: headers
    };
    return this.http.post(
      environment.REST_API + '/rest/login/register', data, options
    ).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

}
