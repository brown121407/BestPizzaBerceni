import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVariantUpdateComponent } from './product-variant-update.component';

describe('ProductVariantUpdateComponent', () => {
  let component: ProductVariantUpdateComponent;
  let fixture: ComponentFixture<ProductVariantUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductVariantUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductVariantUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
