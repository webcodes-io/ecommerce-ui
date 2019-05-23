import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  // {path: '**', component: LoginComponent}

];

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.run(LoginEffects),
    RouterModule.forChild(routes)
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
