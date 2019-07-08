import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule, Routes } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsEffects } from './store/effects/products.effects';
import { CoreModule } from '../core/core.module';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { AddDetailsComponent } from './components/create-product/add-details/add-details.component';
import { UploadImagesComponent } from './components/create-product/upload-images/upload-images.component';
import { AddToCartComponent } from './components/child-components/add-to-cart/add-to-cart.component';
import { AuthguardService } from '../core/services/authguard.service';
import { productsReducer } from './store/reducers/reducers';
import {StoreModule} from '@ngrx/store';

const routes: Routes = [
  {path: 'products', component: ProductListComponent, canActivate: [AuthguardService]},
  {path: 'details/:slug', component: ProductDetailsComponent, canActivate: [AuthguardService]},
  {path: 'create-product', component: CreateProductComponent, canActivate: [AuthguardService],
    children: [
      {path: '', redirectTo: 'add-details', pathMatch: 'full'},
      {path: 'add-details', component: AddDetailsComponent},
      {path: 'upload-images/:slug', component: UploadImagesComponent}
    ]
  }
  // {path: '**', component: ProductListComponent, canActivate: [AuthguardService]}
];

// const routes: Routes = [
//   {path: 'products', component: ProductListComponent},
//   {path: 'details/:slug', component: AddToCartComponent},
//   {path: 'create-product', component: CreateProductComponent}
// ];

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule, 
    ReactiveFormsModule, 
    RouterModule.forChild(routes),
    StoreModule.forFeature('productsReducer', productsReducer),
    EffectsModule.forFeature([ProductsEffects]),
    AlertModule.forRoot()
  ],
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    CreateProductComponent,
    AddToCartComponent,
    AddDetailsComponent,
    UploadImagesComponent
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ProductsEffects
  ]
})
export class ProductsModule { }
