
import { combineReducers, ActionReducer } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';

import { AppStates } from './products/store/states/app.states';
import { productsReducer } from './products/store/reducers/reducers';
import { userLoginReducer } from './auth/store/reducers/login.reducers';
import { cartReducer } from './cart/store/reducers/cart.reducers';

const reducers = {
  productsReducer,
  userLoginReducer,
  cartReducer
};

export const appReducers: ActionReducer<AppStates> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  return appReducers(state, action);
}

