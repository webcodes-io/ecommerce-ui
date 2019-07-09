import { Action } from '@ngrx/store';
import { Injectable } from "@angular/core";
import { Products, ProductDetails, ProductSlug, removeProductId, error_message } from '../../models/products.model';

export const GET_PRODUCT_DETAILS = 'GET_PRODUCT_DETAILS';
export const GET_PRODUCT_DETAILS_SUCCESS = 'GET_PRODUCT_DETAILS_SUCCESS';
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const RESET_PRODUCT_DETAILS = 'RESET_PRODUCT_DETAILS';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const ERROR_LOADING ='ERROR_LOADING';
export const CREATE_NEW_PRODUCT = 'CREATE_NEW_PRODUCT';
export const CREATE_NEW_PRODUCT_SUCCESS = 'CREATE_NEW_PRODUCT_SUCCESS';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const UPLOAD_PRODUCT_IMAGE = 'UPLOAD_PRODUCT_IMAGE';
export const UPLOAD_PRODUCT_IMAGE_SUCCESS = 'UPLOAD_PRODUCT_IMAGE_SUCCESS';

export class GetProductDetails implements Action {
  readonly type = GET_PRODUCT_DETAILS;
  constructor(public payload: ProductSlug ) {
  }
}

export class ResetProductDetails implements Action {
  readonly type = RESET_PRODUCT_DETAILS;
}

export class GetProductDetailsSuccess implements Action {
  readonly type = GET_PRODUCT_DETAILS_SUCCESS;
  constructor(public payload: ProductDetails ) {
  }
}

export class GetProducts implements Action {
  readonly type = GET_PRODUCTS;
}

export class GetProductsSuccess implements Action {
  readonly type = GET_PRODUCTS_SUCCESS;
  constructor(public payload: Products ) {
  }
}

export class CreateNewProduct implements Action {
  readonly type = CREATE_NEW_PRODUCT;
  constructor(public payload: Products ) {
  }
}

export class CreateNewProductSuccess implements Action {
  readonly type = CREATE_NEW_PRODUCT_SUCCESS;
  constructor(public payload: Products ) {
  }

}

export class RemoveProduct implements Action {
  readonly type = REMOVE_PRODUCT;
  constructor(public payload: removeProductId ) {
  }
}

export class UploadProductImage implements Action {
  readonly type = UPLOAD_PRODUCT_IMAGE;
  constructor(public payload: {
    file: File, productId: string
  } ) {
  }
}
export class uploadImageSuccess implements Action {
  readonly type = UPLOAD_PRODUCT_IMAGE_SUCCESS;
  constructor(public payload: {
    file: File, productId: string
  } ) {
  }
}

export class EffectError implements Action {
  readonly type = ERROR_LOADING;
  constructor(public payload?: error_message ) {
  }
}
