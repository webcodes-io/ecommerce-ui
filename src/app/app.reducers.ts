import { combineReducers } from '@ngrx/store';

const reducers = {
};

export const appReducers: any = combineReducers(reducers);

export function reducer(state: any, action: any) {
  return appReducers(state, action);
}

