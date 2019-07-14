import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppStates } from '../../../products/store/states/app.states';
import { LogOut } from '../../store/actions/login.actions';
import {AppCookieService} from '../../../core/services/cookie.service';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,
              private appCookieService: AppCookieService,
              private store: Store<AppStates>) {

    this.store.select(
      data => {
        if (data && data['userLoginReducer']) {
          return data['userLoginReducer'];
        }
      }
    ).subscribe(res => {
      if (res && !res.userDetail) {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {
    this.store.dispatch(new LogOut());
  }

}
