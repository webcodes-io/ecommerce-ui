import {Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ProductsService } from '../../../core/services/products.service';
import { GetProductDetails } from '../../store/actions/products.actions';
import { AddToCart } from '../../../cart/store/actions/cart.actions';
import { AppStates } from '../../store/states/app.states';
import { LoginService } from "../../../core/services/login.service";
import { Products, ProductDetails} from '../../models/products.model';

import { Observable } from "rxjs";

import {productsReducer} from '../../store/reducers/reducers';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public show = true;
  public slug: string;
  public quantity = 1;
  // TODO : add max stock product amount in create product API or logic to update stock remaining (for now harcoding to 10 max)
  public maxQuantity = 10;
  public minQuantity = 1;
  public productDetail$: Observable<ProductDetails>;
  public limitStockMessage: string;

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
    }).pipe(map((res: any) => {
      if (res && res.uiStateProductDetails) {
        this.productId = res.uiStateProductDetails.id;
        return res.uiStateProductDetails;
      } else {
        return;
      }
    }));
  }

  addToCart() {
    //TODO: add option to add number of items
    this.store.dispatch(new AddToCart(
      {
        id : this.productId,
        quantity: this.quantity
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

  incrementQuantity() {
    if(this.quantity < this.maxQuantity) {
      ++this.quantity;
      this.limitStockMessage = '';
    } else {
      this.limitStockMessage = 'You reached the maximum limit';
    }
  }

  decrementQuantity() {
    if(this.quantity > this.minQuantity) {
      --this.quantity;
      this.limitStockMessage = '';
    } else {
      this.limitStockMessage = 'You reached the minimum limit';
    }
  }

  checkIfExceedLimit(numberEntered) {
    if(isNaN(numberEntered)) {
      this.limitStockMessage = 'Please enter a number';
      this.quantity = this.minQuantity;
    } else if (numberEntered >= this.maxQuantity) {
      this.limitStockMessage = 'You reached the maximum limit';
      this.quantity = this.maxQuantity;
    } else if (numberEntered < this.minQuantity) {
      this.limitStockMessage = 'You reached the minimum limit';
      this.quantity = this.minQuantity;
    } else {
      this.limitStockMessage = '';
      this.quantity = numberEntered;
    }
  }
}
