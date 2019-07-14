import {map} from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStates } from '../../../products/store/states/app.states';
import { AppCookieService } from '../../../core/services/cookie.service';
import {transition, trigger, style, animate} from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cart$ : Observable<any>;
  isCollapsed = true;
  user = undefined;
  currentUrl: string;

  constructor(private appCookieService: AppCookieService,
              private store: Store<AppStates>,
              private router: Router,
              private route: ActivatedRoute) {
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

    this.router.events.subscribe(currentRoute => {
      if (currentRoute instanceof RoutesRecognized) {
        switch (currentRoute.urlAfterRedirects.split('/')[1]) {
          case 'products':
            this.currentUrl = 'Products';
            break;
          case 'details':
            this.currentUrl = 'Details';
            break;
          case 'cart':
            this.currentUrl = 'Cart';
            break;
          case 'checkout':
            this.currentUrl = 'Checkout';
            break;
          default:
            this.currentUrl = 'Products';
            break;
        }
      }
    });
  }
  
  logout() {
    this.appCookieService.logout();
  }

  ngOnInit() {

  }

}
