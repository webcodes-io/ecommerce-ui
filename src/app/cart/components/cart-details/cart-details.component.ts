import {Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { GetCurrentOrderFromStore } from '../../store/actions/cart.actions';
import { AppStates } from '../../store/states/cart.states';
import { Order } from '../../models/cart.model';
import { Observable } from 'rxjs/Observable';
import { AppCookieService } from '../../../core/services/cookie.service';

@Component({
  selector: 'app-home',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  public productsInCart: Observable<Order>;
  public error = false;

  constructor(private store: Store<AppStates>,
              private appCookieService: AppCookieService,
              private router: Router) {
     
    this.store.select( store => {
        if (store && store['cartReducer']) {
          return store['cartReducer'];
        }
      }
    ).map(data => {
        if (data) {
          return data.currentOrderInCart;
        }
    }).subscribe(res => { 
      this.productsInCart = res.itemList;
    });
  }

  ngOnInit() {
    // if (this.appCookieService.getTokenFromCookie() != null ) {
    //   this.store.dispatch(new GetCurrentOrderFromStore());
    // }
    // else
    //   this.router.navigate(['/login']);
  }

}
