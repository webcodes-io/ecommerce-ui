import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { userLoginReducer } from './store/reducers/login.reducers';
import { AlertModule } from 'ngx-bootstrap/alert';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { CoreModule } from '../core/core.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginEffects } from './store/effects/login.effects';
//TODO: finilze proper routing and add guards
const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CoreModule,
    AlertModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('userLoginReducer', userLoginReducer),
    EffectsModule.forFeature([LoginEffects])
  ],
  declarations: [
    LoginComponent,
    LogoutComponent,
    RegisterComponent
  ],
  exports: [
    RouterModule,
    LogoutComponent
  ],
  providers: [

  ]
})
export class LoginModule { }
