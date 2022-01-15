import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {IIngredient} from "../../../../models/ingredient";
import {IngredientService} from "../../../ingredients/services/ingredient.service";
import { IProduct, IProductCreate } from "../../../../models/product";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({
    'name': new FormControl('', Validators.required),
    'checkboxes': new FormArray([])
  });
  isLoading: boolean = false;
  ingredients!: IIngredient[];
  products!: IProduct[];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private ingredientService: IngredientService
  ) { }

  ngOnInit(): void {
    this.ingredientService.getIngredients().subscribe((res: IIngredient[]) => {
      this.ingredients = res;
      this.ingredients.forEach((_) => (this.formGroup.get('checkboxes') as FormArray).push(new FormControl(false)))
    });
    this.productService.getProducts().subscribe((res: IProduct[]) => this.products = res);
  }

  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  addProd(): void {
    this.isLoading = true;
    const arrayControl = (this.formGroup.get('checkboxes') as FormArray);
    const ingredients = this.ingredients.filter((_, index) => arrayControl.at(index).value);
    const product: IProductCreate = {
      name: this.formGroup.get('name')!.value,
      ingredients: ingredients.map((x: IIngredient) => x.id),
      productVariants: []
    };

    this.productService.addProduct(product)
      .subscribe({
        next: (_) => {
          this.isLoading = false;
          this.toastr.success("Product added successfully");
          this.goToPage(`/products/list`);
        },
        error: (err: any) => {
          this.toastr.error(JSON.stringify(err));
          this.isLoading = false;
        }
      });
  }
}
