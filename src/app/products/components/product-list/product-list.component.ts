import {map} from 'rxjs/operators';
import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';

import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { GetProducts } from '../../store/actions/products.actions';
import { AppStates } from '../../store/states/app.states';
import { errorState, Products } from '../../models/products.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { AppCookieService } from '../../../core/services/cookie.service';
import {AddToCart, CheckOut} from "../../../cart/store/actions/cart.actions";
import { RemoveProduct } from '../../store/actions/products.actions';
import { ProductDetails} from '../../models/products.model';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public products$: Observable<Products[]>;
  public error = false;
  @ViewChild('confirmation_template') confirmation_template: ModalDirective;
  @ViewChild('error_modal') error_modal: ModalDirective;
  approveModal: BsModalRef | null;
  confirmationModal: BsModalRef | null;
  errorModal: BsModalRef | null;
  deleteProduct: ProductDetails;
  internalDeleteProductMessage: BehaviorSubject<{state:string;}> = new BehaviorSubject({state:undefined});

  constructor(private store: Store<AppStates>,
              private appCookieService: AppCookieService,
              private router: Router,
              private modalService: BsModalService
            ) {

    this.products$ = this.store.select(
      res => {
        if(res && res['userLoginReducer'] ) {
          if(res['userLoginReducer']['errorLoading']  && res['userLoginReducer']['errorLoading']['error_message'] == 'remove_product_error') {
            this.internalDeleteProductMessage.next({ state: 'delete_product_error' });
          } else {
            this.internalDeleteProductMessage.next({ state: 'no_errors' });
          }
        } if (res && res['productsReducer']) {
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

  removeItemFromProductList() {
    this.store.dispatch(new RemoveProduct(
      {
        id : this.deleteProduct.id
      }
    ));

    this.internalDeleteProductMessage.subscribe( (status: any) => {
        switch (status.state) {
          case 'delete_product_error':
            if(this.confirmationModal) { this.confirmationModal.hide()}
            this.errorModal = this.modalService.show(this.error_modal, { class: 'modal-lg' });
            break;
          case 'no_errors':
            if(this.errorModal) {this.errorModal.hide()}
            this.confirmationModal = this.modalService.show(this.confirmation_template, { class: 'modal-lg' });
            break;
          default:
        }
      });


  }

  deleteProductConfirmation(template: TemplateRef<any>, deleteProduct: ProductDetails) {
    this.deleteProduct = deleteProduct;
    this.approveModal = this.modalService.show(template, { class: 'modal-lg' });
  }

}
