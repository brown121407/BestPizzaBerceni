import { Component, OnInit } from '@angular/core';
import {IProduct} from "../../../../models/product";
import {IProductVariant} from "../../../../models/product-variant";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {ToastrService} from "ngx-toastr";
import {IngredientService} from "../../../ingredients/services/ingredient.service";

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
  formGroup: FormGroup = new FormGroup({
    'name': new FormControl('', Validators.required),
    'quantity': new FormControl(0, Validators.required),
    'unit': new FormControl('', Validators.required),
    'price': new FormControl(0, Validators.required)
  });

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private productService: ProductService, private router: Router, private toastr: ToastrService, private ingredientService: IngredientService) {
  }
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('idProd'));
    this.isLoading = true;
    this.productService.getProductById(this.id).subscribe( (res: IProduct) => {
      this.product = res;
      this.isLoading = false;
    })
  }
  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  addProductVariant(): void{
    this.isLoading = true;
  this.productVariant = {
    name: this.formGroup.get('name')!.value,
    quantity: this.formGroup.get('quantity')!.value,
    price: this.formGroup.get('price')!.value,
    unit: this.formGroup.get('unit')!.value,
    product: this.product
  }
  this.productService.addProductVariant(this.productVariant).subscribe({

  })

  }
}
