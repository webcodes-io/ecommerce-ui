import {Component, OnInit, OnDestroy} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { ProductsService } from '../../../core/services/products.service';
import { GetProductDetails, ResetProductDetails } from '../../store/actions/products.actions';
import { AddToCart } from '../../../cart/store/actions/cart.actions';
import { AppStates } from '../../store/states/app.states';
import { LoginService } from "../../../core/services/login.service";
import { ProductDetails} from '../../models/products.model';

import { Observable } from "rxjs";

import { map } from 'rxjs/operators';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  public show = true;
  public slug: string;
  public selectedQuantity = 1;
  // TODO : add max stock product amount in create product API or logic to update stock remaining (for now harcoding to 10 max)
  public maxQuantity = 10;
  public minQuantity = 1;
  public productDetail$: Observable<ProductDetails>;
  private productId: string;

  constructor(private store: Store<AppStates>,
              private loginService: LoginService,
              private router: Router,
              private productsService: ProductsService,
              private route: ActivatedRoute,
              private translateService: TranslateService) {

    translateService.use('en');

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
        quantity: this.selectedQuantity
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

    this.productDetail$.subscribe(productDetail => {
      if(productDetail && productDetail.defaultMaxQuantity) {
        this.maxQuantity = productDetail.defaultMaxQuantity;
      }
    })
  }

  ngOnDestroy() {
    this.store.dispatch(new ResetProductDetails());
  }

  onSelectedQuantity(quantity) {
    this.selectedQuantity = quantity;
  }

  countSum(price, selectedQuantity) {
    return Math.round(price * selectedQuantity * 100)/100;
  }

  getProductUrl(product) {
    if(product && product.imageList.length > 0) {
      let url = product.imageList[0]['imageUrl'] ? product.imageList[0]['imageUrl'] :
        product.imageList[0]['largeUrl'] ? product.imageList[0]['largeUrl'] : '/assets/images/teapod.jpeg';
      console.log(url);
      return url;
    } else if(product && product.imageList.length == 0) {
      return  '/assets/images/teapod.jpeg';
    }
  }

}
