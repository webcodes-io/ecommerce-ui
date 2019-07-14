
import {map} from 'rxjs/operators';
import {Component, OnInit, Inject} from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppStates } from '../../../products/store/states/app.states';
import { LoginService } from '../../../core/services/login.service';
import { RegisterUserAction } from '../../store/actions/login.actions';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private router: Router,
              private loginService: LoginService,
              private store: Store<AppStates>,
              @Inject(FormBuilder) fb: FormBuilder) {
              this.registerForm = fb.group({
                userName: [null, Validators.minLength(6)],
                email:    [null, Validators.minLength(6)],
                mobile:    [null, Validators.minLength(6)],
                password: [null, Validators.minLength(6)],
                confirmPassword: [null, Validators.minLength(6)]
                })
              }

    ngOnInit() {
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
          this.router.navigate(['/login']);
        }
      });
    }

    register() {
      this.store.dispatch(new RegisterUserAction(this.registerForm.value));
    }

}
