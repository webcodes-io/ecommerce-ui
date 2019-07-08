import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router'

import { CreateProductComponent } from './add-details.component';
import {ProductsService} from '../../../../core/services/products.service';
import {productsReducer} from "../../../store/reducers/reducers";

export class ProductsServiceStub {
    getAllProducts(): any {}
    getProductDetails(path: any) {}
    create(data?: any): any {}
}
export class RouterStub {
    navigate(routes: string []) {
    }
}


describe('CreateProductComponent', () => {
    let component: CreateProductComponent;
    let fixture: ComponentFixture<CreateProductComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ CreateProductComponent ],
            imports: [
                ReactiveFormsModule, 
                FormsModule,
                StoreModule.forFeature('productsReducer', productsReducer)
            ],
            providers: [
                {provide: ProductsService, useClass: ProductsServiceStub},
                {provide: Router, useClass: RouterStub},
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateProductComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
