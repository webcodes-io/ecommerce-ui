//
// import { Router, ActivatedRoute, Routes } from '@angular/router'
//
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import {RouterTestingModule} from "@angular/router/testing";
// import { StoreModule } from '@ngrx/store';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { AlertModule } from 'ngx-bootstrap/alert';
//
// import { AddToCartComponent } from './add-to-cart.component';
//
//
// export const fake_routes: Routes = [
//   {path: 'details/:slug', component: AddToCartComponent}
// ];
//
// export class LoginServiceStub {
//   login(data?: any): any {}
//   register(data?: any): any {}
// }
//
// export class ProductsServiceStub {
//     getAllProducts(): any {}
//     getProductDetails(path: any) {}
//     create(data?: any): any {}
// }
//
// describe('AddToCartComponent', () => {
//   let component: AddToCartComponent;
//   let fixture: ComponentFixture<AddToCartComponent>;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//         imports: [
//             AlertModule,
//             StoreModule.forFeature('productsReducer', productsReducer),
//             RouterTestingModule.withRoutes(fake_routes)
//         ],
//         declarations: [ AddToCartComponent ],
//         providers: [
//             {provide: LoginService, useClass: LoginServiceStub},
//             {provide: ProductsService, useClass: ProductsServiceStub},
//         ],
//         schemas: [NO_ERRORS_SCHEMA]
//     });
//
//     fixture = TestBed.createComponent(AddToCartComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//
//     let productsService = TestBed.get(ProductsService);
//
//   }));
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
