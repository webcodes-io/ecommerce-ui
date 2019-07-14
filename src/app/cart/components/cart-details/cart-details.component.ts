import {map} from 'rxjs/operators';
import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { GetCurrentOrderFromStore, RemoveFromCart } from '../../store/actions/cart.actions';
import { AppStates } from '../../store/states/cart.states';
import { Order } from '../../models/cart.model';
import {BehaviorSubject, Observable} from 'rxjs';
import { AppCookieService } from '../../../core/services/cookie.service';
import {RemoveProduct} from "../../../products/store/actions/products.actions";
import {ProductDetails} from "../../../products/models/products.model";
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-home',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit {

  public productsInCart: Observable<Order>;
  public error = false;
  @ViewChild('confirmation_template') confirmation_template: ModalDirective;
  @ViewChild('error_modal') error_modal: ModalDirective;
  approveModal: BsModalRef | null;
  confirmationModal: BsModalRef | null;
  errorModal: BsModalRef | null;
  deleteProduct: ProductDetails;
  deleteProductState: {action: string; state:string;} = {action: undefined, state:undefined};
  deleteProductSubject: BehaviorSubject<{action: string; state:string;}> = new BehaviorSubject({action: undefined, state:undefined});

  constructor(private store: Store<AppStates>,
              private appCookieService: AppCookieService,
              private router: Router,
              private bsModalService: BsModalService) {
     
    this.store.select( store => {

        if(store && store['userLoginReducer'] ) {
          if(store['userLoginReducer']['errorLoading']  && store['userLoginReducer']['errorLoading']['error_message'] == 'remove_product_error') {
            Object.assign(this.deleteProductState, { state: 'delete_product_error' });
          } else {
            Object.assign(this.deleteProductState, { state: 'no_errors' });
          }
          this.deleteProductSubject.next(this.deleteProductState);
        }

        if (store && store['cartReducer']) {
          return store['cartReducer'];
        }
      }
    ).pipe(map(data => {
        if (data) {
          return data.currentOrderInCart;
        }
    })).subscribe(res => { 
      this.productsInCart = res.itemList;
    });
  }

  ngOnInit() {
    // if (this.appCookieService.getTokenFromCookie() != null ) {
    //   this.store.dispatch(new GetCurrentOrderFromStore());
    // }
    // else
    //   this.router.navigate(['/login']);
    this.deleteProductSubject.subscribe( (status: any) => {

      if (status.state == 'delete_product_error' && status.action == 'delete_product') {

        if (this.confirmationModal) {
          this.confirmationModal.hide();
        }
        if (this.approveModal) {
          this.approveModal.hide();
        }
        if (!this.errorModal) {
          this.errorModal = this.bsModalService.show(this.error_modal, {class: 'modal-lg'});
        } else {
        }

      } else if (status.state == 'no_error' && status.action == 'delete_product') {
        if(this.errorModal) {this.errorModal.hide()}
        if(!this.confirmationModal) {this.confirmationModal = this.bsModalService.show(this.confirmation_template, { class: 'modal-lg' })}
      }

      else {

      }

    });
  }

  totalSum(price, selectedQuantity) {
    return Math.round(price * selectedQuantity * 100)/100;
  }

  removeItemFromOrder() {
    this.store.dispatch(new RemoveFromCart(
      {
        id : this.deleteProduct.id
      }
    ));
    Object.assign(this.deleteProductState, { action: 'delete_product', state: 'no_errors' });
    this.deleteProductSubject.next(this.deleteProductState);
  }

  deleteProductConfirmation(template: TemplateRef<any>, deleteProduct: ProductDetails) {
    this.deleteProduct = deleteProduct;
    this.errorModal = null;
    this.approveModal = this.bsModalService.show(template, { class: 'modal-lg' });
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
