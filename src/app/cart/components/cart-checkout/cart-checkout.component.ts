
import {map} from 'rxjs/operators';
import {Component, OnInit, Inject, TemplateRef, ViewChild} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { GetCurrentOrderFromStore, CheckOut } from '../../store/actions/cart.actions';
import { AppStates } from '../../store/states/cart.states';
import { Order, CheckoutInfo, PaymentMethods, PaymentDescription } from '../../models/cart.model';
import { Observable } from 'rxjs';
import { AppCookieService } from '../../../core/services/cookie.service';
import { CartService } from '../../../core/services/cart.service';
import { Payments } from '../../enums/payments.enum';

import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-home',
  templateUrl: './cart-checkout.component.html',
  styleUrls: ['./cart-checkout.component.scss']
})
export class CartCheckoutComponent implements OnInit {
  public defaultMethodsOfPayment: PaymentDescription[] = [
      {
        _id: 1,
        paymentType: 'cash on delivery'
      },
      {
        _id: 2,
        paymentType: 'debit'
      },
      {
        _id: 3,
        paymentType: 'credit'
      },
      {
        _id: 4,
        paymentType: 'check'
      }
    ];

  public productsInCart: any;
  private checkOutConfirmationStatus: boolean = false;
  public methodsOfPayment: PaymentDescription[] = this.defaultMethodsOfPayment;
  public error = false;
  private payment = {};
  private totalAmount: number;
  private totalQuantity: number;
  public checkoutForm: FormGroup;

  modalCheckoutApprove: BsModalRef | null;
  modalCheckoutConfirmation: BsModalRef;
  @ViewChild('confirmation_template') confirmation_template: ModalDirective;

  constructor(private store: Store<AppStates>,
              private appCookieService: AppCookieService,
              private router: Router,
              private cartService: CartService,
              private modalService: BsModalService,
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
    ).pipe(map(data => {
      if (data) {
        return data.currentOrderInCart;
      }
    })).subscribe(res => {
      if(res && res.itemList) {
        this.productsInCart = res.itemList;
      }
    });

    // app store for total amount
    this.store.select( store => {
      return store['cartReducer'];
    }).pipe(map(res => {
      if (res && res.currentOrderInCart) {
        return res.currentOrderInCart;
      }
    })).subscribe(cartInfo => {
      if(cartInfo && cartInfo.totalAmount && cartInfo.totalAmount) {
        this.totalAmount = cartInfo.totalAmount;
        this.totalQuantity = cartInfo.totalQuantity;
        this.payment = {amount: cartInfo.totalAmount}
      }
    });
    //checkout confirmation status
    this.store.select( store => {
      return store['cartReducer'];
    }).pipe(map(res => {
      if (res && res.checkOutConfirmationStatus) {
        return res.checkOutConfirmationStatus;
      }
    })).subscribe(cartInfo => {
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
    .subscribe((res :any) => {
      if(res.payments.length > 0) {
        this.methodsOfPayment = res.payments;
      }
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
    this.modalCheckoutConfirmation = this.modalService.show(this.confirmation_template);
  }

  openCheckoutApproveModal(template: TemplateRef<any>) {
    this.modalCheckoutApprove = this.modalService.show(template, { class: 'modal-sm' });
  }

  closeCheckoutApproveModal() {
    this.modalCheckoutApprove.hide();
  }

  closeCheckoutConfirmationModal() {
    this.modalCheckoutConfirmation.hide();
    this.closeCheckoutApproveModal()
  }

  totalSum(price, selectedQuantity) {
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
