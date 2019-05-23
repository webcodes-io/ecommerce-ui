import {Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ProductsService } from '../../../core/services/products.service';
import { GetProductDetails } from '../../store/actions/products.actions';
import { AddToCart } from '../../../cart/store/actions/cart.actions';
import { AppStates } from '../../store/states/app.states';
import { LoginService } from "../../../core/services/login.service";
import { Products, ProductDetails} from '../../models/products.model';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/switchMap';
import {productsReducer} from '../../store/reducers/reducers';

@Component({
  selector: 'app-home',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public show = true;
  public slug: string;
  public productDetail$: Observable<ProductDetails>;

  private productId: string;
  constructor(private store: Store<AppStates>,
              private loginService: LoginService,
              private router: Router,
              private productsService: ProductsService,
              private route: ActivatedRoute) {
    this.productDetail$ = this.store.select(store => {
      if (store && store['productsReducer']) {
        return store['productsReducer'];
      }
    }).map(res => {
      if (res && res.uiStateProductDetails) {
        this.productId = res.uiStateProductDetails.id;
        return res.uiStateProductDetails;
      } else {
        return;
      }
    });
  }

  addToCart() {
    //TODO: add option to add number of items
    this.store.dispatch(new AddToCart(
      { id : this.productId,
        quantity: 1 
        }
      ));
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: any) => {
        this.slug = params['slug'];
        this.store.dispatch(new GetProductDetails({ slug : this.slug }));
      }
    );
  }
}
