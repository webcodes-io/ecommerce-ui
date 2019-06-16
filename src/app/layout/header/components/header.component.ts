
import {map} from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStates } from '../../../products/store/states/app.states';
import { AppCookieService } from '../../../core/services/cookie.service';
import {transition, trigger, style, animate} from '@angular/animations';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cart$ : Observable<any>;
  isCollapsed = true;
  user = undefined;
  constructor(private appCookieService: AppCookieService,
              private store: Store<AppStates>,
              private router: Router) {
    // user properties for header
    this.store.select( store => {
      return store['userLoginReducer'];
    }).pipe(map((res: any) => {
      if (res && res.userDetails) {
        return res.userDetails;
      }
    })).subscribe(resp => {
      this.user = resp;
    });
    // cart properties for header
    this.cart$ = this.store.select( store => {
      return store['cartReducer'];
    }).pipe(map((res: any) => {
      if (res && res.currentOrderInCart) {
        return res.currentOrderInCart;
      }
    }));
  }
  
  logout() {
    this.appCookieService.logout();
  }

  ngOnInit() {

  }

}
