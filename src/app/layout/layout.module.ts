import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/components/header.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    CollapseModule.forRoot()
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent,
    CollapseModule
  ],
  providers: [

  ]
})
export class LayoutModule { }
