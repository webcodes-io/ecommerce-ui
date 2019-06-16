
import {map} from 'rxjs/operators';
import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';

import { UserCredentials } from '../../models/login.model';
import { AppCookieService } from '../../../core/services/cookie.service';
import { LoginAction } from '../../store/actions/login.actions';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = null;
  userName$;
  user: string;
  constructor(private appCookieService: AppCookieService,
              private router: Router,
              private store: Store<UserCredentials>,
              @Inject(FormBuilder) fb: FormBuilder) {
    this.loginForm = fb.group({
      userName: [null, Validators.minLength(3)],
      password: [null, Validators.minLength(3)]
    });

      this.store.select( states => states['userLoginReducer']).pipe(
      map((data: any) => {
        if (data && data.registerUser) {
          return data.registerUser;
        } else {
          return ;
        }
      }))
      .subscribe(res => {
        if (res && res.userName) {
          this.loginForm.setValue({userName: res.userName, password: null});
        }
      });

    this.store.select( states => {
      return states['userLoginReducer']
    }).pipe(
      map(( data: any) => {
        if (data && data.userDetails) {
          return data.userDetails;
        } else {
          return ;
        }
      }))
      .subscribe(res => {
        if (res && res.token) {
          this.router.navigate(['/products']);
        }
    });


  }
  login() {
    this.store.dispatch(new LoginAction(this.loginForm.value));
  }

  ngOnInit() {
    if (this.appCookieService.getTokenFromCookie() != null) {
      // this.router.navigate(['/products']);
    }
  }

}
