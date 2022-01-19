import { Component, OnInit } from '@angular/core';
import {IProduct} from "../../../../models/product";
import {IProductVariant, IProductVariantCreate} from "../../../../models/product-variant";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {ToastrService} from "ngx-toastr";
import {IngredientService} from "../../../ingredients/services/ingredient.service";
import { ProductVariantService } from "../../services/product-variant.service";

@Component({
  selector: 'app-product-variant-add',
  templateUrl: './product-variant-add.component.html',
  styleUrls: ['./product-variant-add.component.css']
})
export class ProductVariantAddComponent implements OnInit {
  product!: IProduct;
  productVariant!: IProductVariant;
  isLoading: boolean = false;
  id!: number;
  page: string = "";
  formGroup: FormGroup = new FormGroup({
    'name': new FormControl('', Validators.required),
    'quantity': new FormControl(0, Validators.required),
    'unit': new FormControl('', Validators.required),
    'price': new FormControl(0, Validators.required)
  });

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private productVariantService: ProductVariantService
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('idProd'));
    this.isLoading = true;
    this.page = "/products/" + this.id.toString();
    this.productService.getProductById(this.id).subscribe( (res: IProduct) => {
      this.product = res;
      this.isLoading = false;
    });
  }

  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  addProductVariant(): void{
    this.isLoading = true;
    const productVariant: IProductVariantCreate = {
      name: this.formGroup.get('name')!.value,
      quantity: this.formGroup.get('quantity')!.value,
      price: this.formGroup.get('price')!.value,
      unit: this.formGroup.get('unit')!.value,
      product: this.id
    };

    this.productVariantService.addProductVariant(productVariant).subscribe({
      next: (_) => {
        this.isLoading = false;
        this.toastr.success("Product Variant added successfully");
        this.goToPage(`/products/` + this.product.id!.toString());
      },
      error: (_) => {
        this.isLoading = false;
      }
    });
  }
}
