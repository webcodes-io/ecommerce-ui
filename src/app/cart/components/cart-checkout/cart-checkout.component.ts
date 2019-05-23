import {Component, OnInit, Inject} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { GetCurrentOrderFromStore, CheckOut } from '../../store/actions/cart.actions';
import { AppStates } from '../../store/states/cart.states';
import { Order, CheckoutInfo, PaymentMethods } from '../../models/cart.model';
import { Observable } from 'rxjs/Observable';
import { AppCookieService } from '../../../core/services/cookie.service';
import { CartService } from '../../../core/services/cart.service';
import { Payments } from '../../enums/payments.enum';

@Component({
  selector: 'app-home',
  templateUrl: './cart-checkout.component.html',
  styleUrls: ['./cart-checkout.component.css']
})
export class CartCheckoutComponent implements OnInit {

  public productsInCart: Observable<Order>;
  private checkOutConfirmationStatus: boolean = false;
  public methodsOfPayment: Observable<PaymentMethods>;
  public error = false;
  private payment = {};
  private totalAmount: number;
  public checkoutForm: FormGroup;
  constructor(private store: Store<AppStates>,
              private appCookieService: AppCookieService,
              private router: Router,
              private cartService: CartService,
               @Inject(FormBuilder) fb: FormBuilder) {
    
    this.checkoutForm = fb.group({
      payment_method_id: [null, Validators.minLength(50)]
    });
    // app store to list checkout products 
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

    // app store for total amount
    this.store.select( store => {
      return store['cartReducer'];
    }).map(res => {
      if (res && res.currentOrderInCart) {
        return res.currentOrderInCart;
      }
    }).subscribe(cartInfo => { 
      this.totalAmount = cartInfo.totalAmount;
      this.payment = {amount: cartInfo.totalAmount}
    });
    //checkout confirmation status
    this.store.select( store => {
      return store['cartReducer'];
    }).map(res => {
      if (res && res.checkOutConfirmationStatus) {
        return res.checkOutConfirmationStatus;
      }
    }).subscribe(cartInfo => { 
      this.checkOutConfirmationStatus = cartInfo;
    });
  }

  ngOnInit() {
    // if (this.appCookieService.getTokenFromCookie() != null ) {
    //   this.store.dispatch(new GetCurrentOrderFromStore());
    // }
    // else
    //   this.router.navigate(['/login']);
    this.cartService.getMethodsOfPayment()
    .subscribe(res => {
      this.methodsOfPayment = res.payments;
    },
    err => console.error(err));
  }

  submitOrder() {

    switch (this.checkoutForm.value.payment_method_id) {
      case 'cash on delivery':
        this.payment = Object.assign(this.payment, {payment_method_id: Payments.cash});
        break;
      case 'debit':
        this.payment = Object.assign(this.payment, {payment_method_id: Payments.debit});
        break;
      case 'credit':
        this.payment = Object.assign(this.payment, {payment_method_id: Payments.credit});
        break;
      case 'check':
        this.payment = Object.assign(this.payment,{payment_method_id: Payments.check});
        break;
      default:
        this.payment = Object.assign(this.payment,{payment_method_id: Payments.cash});
    };

    this.store.dispatch(new CheckOut(this.payment));
  }
}
