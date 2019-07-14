import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppStates } from '../../../store/states/app.states';
import { ProductsService } from '../../../../core/services/products.service';
import { CreateNewProduct } from '../../../store/actions/products.actions';
import { ProductDetails } from '../../../models/products.model';
import {map} from 'rxjs/operators';

@Component({
  selector: 'create-product',
  templateUrl: './add-details.component.html',
  styleUrls: ['./add-details.component.scss']
})
export class AddDetailsComponent implements OnInit {

    addProductForm: FormGroup;
    @ViewChild('image') image: ElementRef;
    submitFormData: any;
    fileDataUrl: any;

    constructor( @Inject(FormBuilder) fb: FormBuilder,
                private productsService: ProductsService,
                private router: Router,
                private store: Store<AppStates> ) {

      this.addProductForm = fb.group({
          name: [null, Validators.required],
          description: [null, Validators.minLength(5)],
          price: [null, Validators.required],
          defaultMaxQuantity: [null, Validators.required],
          slug: [null, Validators.required]
        });

        this.store.select(
          res => {
            if (res && res['productsReducer'] && res['productsReducer'] && res['productsReducer']['productCreated'] ) {
              return res['productsReducer']['productCreated'];
            }
          }
        ).pipe(
          map(v => {
            return v;
          })
        ).subscribe(
          (productCreated: any) => {

              if(productCreated) {
                this.router.navigate([`/create-product/upload-images/${productCreated['slug']}`]);
              }

          },
          err => console.error(err)
        );

      }

      ngOnInit() {
      }
      
      addProduct() {
        this.submitFormData = Object.assign({}, this.addProductForm.value, { image: this.fileDataUrl } );
        this.store.dispatch(new CreateNewProduct(this.submitFormData));
      }
}
