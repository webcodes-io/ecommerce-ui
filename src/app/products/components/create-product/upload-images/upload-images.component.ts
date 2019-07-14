import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppStates } from '../../../store/states/app.states';
import { ProductsService } from '../../../../core/services/products.service';
import {UploadProductImage, GetProductDetails} from '../../../store/actions/products.actions';

import {map} from 'rxjs/operators';
import {Observable} from "rxjs";
import {ProductDetails} from "../../../models/products.model";

@Component({
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss']
})
export class UploadImagesComponent implements OnInit {

    @ViewChild('image') image: ElementRef;
    fileDataUrl: any;
    slug: string;
    public productDetail$: Observable<ProductDetails>;
    private productId: string;
    selectedImageToUpload: File = null;

    constructor( @Inject(FormBuilder) fb: FormBuilder,
                private productsService: ProductsService,
                private router: Router,
                private route: ActivatedRoute,
                private store: Store<AppStates> ) {

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

          this.store.select(store => {
            if (store && store['productsReducer'] && store['productsReducer']['imageUploaded']) {
              return store['productsReducer']['imageUploaded'];
            }
          }).pipe(map((res: any) => res))
            .subscribe(uploadedImage => {
              if(this.slug) {
                this.store.dispatch(new GetProductDetails({ slug : this.slug }));
              }
            });

      }

      ngOnInit() {
        this.route.params.subscribe(
          (params: any) => {
            this.slug = params['slug'];
            this.store.dispatch(new GetProductDetails({ slug : this.slug }));
          }
        );
      }

      uploadImage(uploadedImage: any) {
        this.selectedImageToUpload = <File>uploadedImage.target.files[0];
      }

      uploadImageFile() {

        this.store.dispatch(new UploadProductImage({ file: this.selectedImageToUpload, productId: this.productId}));

      }
}
