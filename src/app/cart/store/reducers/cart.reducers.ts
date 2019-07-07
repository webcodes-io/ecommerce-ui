import { Action, ActionReducer } from '@ngrx/store';
import { AppStates } from '../../../products/store/states/app.states';
import {
  CREATE_ORDER_NUMBER, ADD_TO_CART, ADD_TO_CART_SUCCESS,
  SAVE_CURRENT_ORDER_IN_STORE, GET_CURRENT_ORDER_FROM_STORE,
  GET_CURRENT_ORDER_FROM_STORE_SUCCESS, CHECK_OUT, CHECK_OUT_SUCCESS, REMOVE_FROM_CART
} from '../actions/cart.actions';
import { Order } from '../../models/cart.model';

export class ReducerClass implements Action {
  type: string;
  payload?: any;
}

const storeOrderNumber = ( state: AppStates, action: ReducerClass ): AppStates => {
  const newData: AppStates = Object.assign({}, state, { shoppingOrderNumber: action.payload} );
  return newData;
};
const addProductToCart = (state: AppStates, action: ReducerClass): AppStates => {
  const newData: AppStates = Object.assign({}, state, { productsInCart: action.payload} );
  return newData;
}
const addProductToCartSuccess = (state: AppStates, action: ReducerClass): AppStates => {
  const newData: AppStates = Object.assign({}, state, { productToCartSuccess: action.payload} );
  return newData;
}
const removeProductFromCart = (state: AppStates, action: ReducerClass): AppStates => {
  const newData: AppStates = Object.assign({}, state, { removeProductFromCart: action.payload} );
  return newData;
}
const storeCurrentOrderInCart = (state: AppStates, action: ReducerClass): AppStates => {
  const newData: AppStates = Object.assign({}, state, { currentOrderInCart: action.payload} );
  return newData;
}
//TODO: finilize readCurrentOrderFromStore & readCurrentOrderFromStoreSuccess:
const readCurrentOrderFromStore =  (state: AppStates, action: ReducerClass): AppStates => {
  return state;
}
const readCurrentOrderFromStoreSuccess = (state: AppStates, action: ReducerClass): AppStates => {
  return state;
}
// make payment
const checkOut = (state: AppStates, action: ReducerClass): AppStates => {
  const newData: AppStates = Object.assign({}, state, { checkOutDetails: action.payload} );
  return newData;
}
const checkOutSuccess = (state: AppStates, action: ReducerClass): AppStates => {
  const newData: AppStates = Object.assign({}, state, { checkOutConfirmationStatus: action.payload} );
  return newData;
}


export const cartReducer: ActionReducer<AppStates> = (state: AppStates, action: ReducerClass): AppStates => {
  switch (action.type) {
    case CREATE_ORDER_NUMBER:
      return storeOrderNumber(state, action);
    case ADD_TO_CART:
      return addProductToCart(state, action);
    case REMOVE_FROM_CART:
      return removeProductFromCart(state, action);
    case ADD_TO_CART_SUCCESS:
      return addProductToCartSuccess(state, action);
    case SAVE_CURRENT_ORDER_IN_STORE:
      return storeCurrentOrderInCart(state, action);
    case GET_CURRENT_ORDER_FROM_STORE:
      return readCurrentOrderFromStore(state, action);
    case GET_CURRENT_ORDER_FROM_STORE_SUCCESS:
      return readCurrentOrderFromStoreSuccess(state, action);
    case CHECK_OUT:
      return checkOut(state, action);
    case CHECK_OUT_SUCCESS:
      return checkOutSuccess(state, action);
    default:
      return state;
  }
};
