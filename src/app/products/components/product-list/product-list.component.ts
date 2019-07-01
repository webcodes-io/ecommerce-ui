
import {map} from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { GetProducts } from '../../store/actions/products.actions';
import { AppStates } from '../../store/states/app.states';
import { errorState, Products } from '../../models/products.model';
import { Observable } from 'rxjs';
import { AppCookieService } from '../../../core/services/cookie.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public products$: Observable<Products[]>;
  public error = false;

  constructor(private store: Store<AppStates>,
              private appCookieService: AppCookieService,
              private router: Router
            ) {
    this.products$ = this.store.select(
      res => {
        if (res && res['productsReducer']) {
          return res['productsReducer'];
        }
      }
    ).pipe(map((v: any) => {
        if (v) {
          return v.storeData;
        }
    }));
  }

  ngOnInit() {
    if (this.appCookieService.getTokenFromCookie() != null ) {
      this.store.dispatch(new GetProducts());
    } else
      this.router.navigate(['/login']);
  }

}
