import { Action, ActionReducer } from '@ngrx/store';
import { AppStates } from '../states/app.states';
import { initStateOfProductDetails } from '../../models/products.model';
import {
  GET_PRODUCT_DETAILS, GET_PRODUCTS, GET_PRODUCT_DETAILS_SUCCESS,
  CREATE_NEW_PRODUCT, CREATE_NEW_PRODUCT_SUCCESS, GET_PRODUCTS_SUCCESS,
  ERROR_LOADING, UPLOAD_PRODUCT_IMAGE_SUCCESS, RESET_PRODUCT_DETAILS
} from '../actions/products.actions';

export class ReducerClass implements Action {
  type: string;
  payload?: any;
}

const loadProductSlug = ( state: AppStates, action: ReducerClass ): AppStates => {
  const newData: AppStates = Object.assign({}, state, { uiProductDetailsSlug: action.payload} );
  return newData;
};

const loadProductDetails = ( state: AppStates, action: ReducerClass ): AppStates => {
  const newData: AppStates = Object.assign({}, state, { uiStateProductDetails: action.payload} );
  return newData;
};

const resetProductDetails = ( state: AppStates, action: ReducerClass ): AppStates => {
  const  newData: AppStates = Object.assign({}, state, { uiStateProductDetails: initStateOfProductDetails} );
  return newData;
};

const appendError = ( state: AppStates, action: ReducerClass ): AppStates => {
  const stateWithError: AppStates = Object.assign({}, state,
      {
        errorState: {
          message: 'Server connection error. Probably you need to login.',
          status: 'error',
          error_code: 'remove_product_error'
        }
      }
    );
  return stateWithError;
}

const loadProducts = ( state: AppStates, action: ReducerClass ): AppStates => {
  const newData: AppStates = Object.assign({}, state, { storeData: action.payload} );
  return newData;
};

const createNewProduct = ( state: AppStates, action: ReducerClass ): AppStates => {
  return state;
};

const uploadProductImageSuccess = ( state: AppStates, action: ReducerClass ): AppStates => {
  return Object.assign({}, state, { imageUploaded: action.payload} );
};

const createNewProductSuccess = ( state: AppStates, action: ReducerClass ): AppStates => {
  return Object.assign({}, state, { productCreated: action.payload} );
};

export const productsReducer: ActionReducer<AppStates> = (state: AppStates, action: ReducerClass): AppStates => {
  switch (action.type) {
    case GET_PRODUCT_DETAILS:
      return loadProductSlug(state, action);
    case GET_PRODUCT_DETAILS_SUCCESS:
      return loadProductDetails(state, action);
    case GET_PRODUCTS:
      return state;
    case RESET_PRODUCT_DETAILS:
      return resetProductDetails(state, action);
    case GET_PRODUCTS_SUCCESS:
      return loadProducts(state, action);
    case CREATE_NEW_PRODUCT:
      return createNewProduct(state, action);
    case UPLOAD_PRODUCT_IMAGE_SUCCESS:
      return uploadProductImageSuccess(state, action);
    case CREATE_NEW_PRODUCT_SUCCESS:
      return createNewProductSuccess(state, action);
    case ERROR_LOADING:
      return appendError(state, action);
    default:
      return state;
  }
};
