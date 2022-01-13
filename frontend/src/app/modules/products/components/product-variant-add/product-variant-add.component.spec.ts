import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVariantAddComponent } from './product-variant-add.component';

describe('ProductVariantAddComponent', () => {
  let component: ProductVariantAddComponent;
  let fixture: ComponentFixture<ProductVariantAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductVariantAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductVariantAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
