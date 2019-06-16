import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppStates } from '../../store/states/app.states';
import { ProductsService } from '../../../core/services/products.service';
import { CreateNewProduct } from '../../store/actions/products.actions';

import {map} from 'rxjs/operators';

@Component({
  selector: 'create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

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
          slug: [null, Validators.required]
        });

        this.store.select(
          res => {
            if (res && res['productsReducer']) {
              return res['productsReducer'];
            }
          }
        ).pipe(
          map(v => {
            if (v) {
              return v.storeData;
            }
          })
        ).subscribe(
          res => {
            console.log('create product res: ', res);
            //  this.router.navigate(['/products']); 
          },
          err => console.log(err)
        );

      }

      ngOnInit() {
      }

      uploadImage() {

      const file = this.image.nativeElement.files[0];
      if (file) {

          const fileReader = new FileReader();
          fileReader.readAsDataURL(this.image.nativeElement.files[0]);
          fileReader.onload = () => {
            if( typeof fileReader.result === "string") {
              this.fileDataUrl = fileReader.result.split(',')[1];
            }
          }
        }
      }
      
      addProduct() {
        this.submitFormData = Object.assign({}, this.addProductForm.value, { image: this.fileDataUrl } );
        console.log(this.submitFormData);
        this.store.dispatch(new CreateNewProduct(this.submitFormData));  
      }
}
