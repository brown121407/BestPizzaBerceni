import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IIngredient} from "../../../../../models/ingredient";
import {IProduct} from "../../../../../models/product";
import {ProductService} from "../../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {IngredientService} from "../../../../ingredients/services/ingredient.service";
import {switchMap} from "rxjs";
import {IProductVariant} from "../../../../../models/product-variant";

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  formGroup!: FormGroup;
  isLoading: boolean = false;
  ingredients!: IIngredient[];
  product!: IProduct;
  id!: number;
  productVariants: IProductVariant[] = [];

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private productService: ProductService, private router: Router, private toastr: ToastrService, private ingredientService: IngredientService) {
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.isLoading = true;
    this.productService.getProductById(this.id).subscribe((res: IProduct) => {
      this.product = res;
      this.productService.getProductVariants().subscribe((result: IProductVariant[]) => {
        this.productVariants = result;
        this.productVariants.filter(x => x.product!.id == this.product.id);
      });
      console.log(this.productVariants);
      this.formGroup = this.formBuilder.group({
        id: [this.product?.id, Validators.required],
        name: [this.product?.name, Validators.required],
        checkboxes: new FormArray([])
      })
      console.log(this.product);
      this.ingredientService.getIngredients().subscribe((ingred: IIngredient[]) => {
        this.ingredients = ingred;
        this.ingredients.forEach((_) => (this.formGroup.get('checkboxes') as FormArray).push(new FormControl(false)))
        this.product.ingredients!.forEach((ingredient: IIngredient) => {
          const index = this.ingredients.findIndex(x => x.id == ingredient.id);
          console.log(ingredient);
          console.log(index);
          if (index != -1) {
            (this.formGroup.get('checkboxes') as FormArray).at(index).setValue(true);
          }
        })
        this.isLoading = false;
      })
    })
  }

  goToPage(pageName: string) {
    //console.log(this.product.id);
    this.router.navigate([`${pageName}`]);
  }

  updateProduct() {
    console.log(this.product);
    this.isLoading = true;
    console.log(this.formGroup.value);
    const arrayControl = (this.formGroup.get('checkboxes') as FormArray);
    const ingredients1 = this.ingredients.filter((_, index) => arrayControl.at(index).value);
    console.log(ingredients1);
    this.product.ingredients = ingredients1;
    this.product.id = this.id;
    this.product.name = this.formGroup.get('name')?.value;
    // const product = {
    //   id: this.id,
    //   name: this.formGroup.get('name')!.value,
    //   ingredients:  ingredients1
    // }
    console.log(this.product);
    this.productService.updateProduct(this.product).subscribe({
      next: (_) => {
        this.isLoading = false;
        this.toastr.success('Successfully updated product!');
        this.goToPage(`/products/` + this.id.toString());
      }, error: (err: any) => this.toastr.error(JSON.stringify(err))
    });
  }


}
