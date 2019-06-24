import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/components/header.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AlertModule } from 'ngx-bootstrap/alert';
@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    BrowserAnimationsModule,
    AlertModule,
    CollapseModule.forRoot()
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
  providers: [

  ]
})
export class LayoutModule { }
