import {map} from 'rxjs/operators';
import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import {TranslateService} from '@ngx-translate/core';
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
  styleUrls: ['./product-list.component.scss']
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
  deleteProductState: {action: string; state:string;} = {action: undefined, state:undefined};
  deleteProductSubject: BehaviorSubject<{action: string; state:string;}> = new BehaviorSubject({action: undefined, state:undefined});

  constructor(private store: Store<AppStates>,
              private appCookieService: AppCookieService,
              private router: Router,
              private modalService: BsModalService,
              translate: TranslateService
            ) {
    translate.use('en');

    this.products$ = this.store.select(
      res => {
        if(res && res['userLoginReducer'] ) {
          if(res['userLoginReducer']['errorLoading']  && res['userLoginReducer']['errorLoading']['error_message'] == 'remove_product_error') {
            Object.assign(this.deleteProductState, { state: 'delete_product_error' });
          } else {
            Object.assign(this.deleteProductState, { state: 'no_errors' });
          }
          this.deleteProductSubject.next(this.deleteProductState);
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

    this.deleteProductSubject.subscribe( (status: any) => {

      if (status.state == 'delete_product_error' && status.action == 'delete_product') {

        if (this.confirmationModal) {
          this.confirmationModal.hide();
        }
        if (this.approveModal) {
          this.approveModal.hide();
        }
        if (!this.errorModal) {
          this.errorModal = this.modalService.show(this.error_modal, {class: 'modal-lg'});
        } else {
        }

      } else if (status.state == 'no_error' && status.action == 'delete_product') {
          if(this.errorModal) {this.errorModal.hide()}
          if(!this.confirmationModal) {this.confirmationModal = this.modalService.show(this.confirmation_template, { class: 'modal-lg' })}
        }

      else {

      }

    });
  }

  removeItemFromProductList() {
    this.store.dispatch(new RemoveProduct(
      {
        id : this.deleteProduct.id
      }
    ));
    Object.assign(this.deleteProductState, { action: 'delete_product', state: 'no_errors' });
    this.deleteProductSubject.next(this.deleteProductState);
    this.approveModal.hide();
  }

  deleteProductConfirmation(template: TemplateRef<any>, deleteProduct: ProductDetails) {
    this.deleteProduct = deleteProduct;
    this.errorModal = null;
    this.approveModal = this.modalService.show(template, { class: 'modal-lg' });
  }

  getProductUrl(product) {
    if(product && product.productInfo && product.productInfo.imageList.length > 0) {
      return product.productInfo.imageList[0]['imageUrl'] ? product.productInfo.imageList[0]['imageUrl'] :
        product.productInfo.imageList[0]['largeUrl'] ? product.productInfo.imageList[0]['largeUrl'] : '/assets/images/teapod.jpeg';
    } else {
      return  '/assets/images/teapod.jpeg';
    }
  }

}
