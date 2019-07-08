import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppStates } from '../../store/states/app.states';
import {map} from 'rxjs/operators';

@Component({
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

    constructor(private router: Router,
                private store: Store<AppStates> ) {

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
          },
          err => console.log(err)
        );

      }

      ngOnInit() {
      }
}
