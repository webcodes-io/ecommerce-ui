import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router, ActivatedRoute, Routes } from '@angular/router'
import { StoreModule } from '@ngrx/store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";

import { AppCookieService } from '../../../core/services/cookie.service';
import { LoginComponent } from './login.component';


class AppCookieServiceStub {
  public logout(): any {}
  public storeTokenInCookie(data: any): void {}
  public getTokenFromCookie(): any {}
  public storeOrderNumberInCookie(data: any): void {}
  public getOrderNumberFromCookie(): any {}
}

export const fake_routes: Routes = [
  {path: 'login', component: LoginComponent}
];

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        {provide: AppCookieService, useClass: AppCookieServiceStub }
      ],
      imports: [
        ReactiveFormsModule, 
        FormsModule,
        StoreModule.provideStore({}),
        RouterTestingModule.withRoutes(fake_routes)
        ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});