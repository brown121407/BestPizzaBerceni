import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IIngredient} from "../../../../models/ingredient";
import {IProduct, IProductUpdate} from "../../../../models/product";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {IngredientService} from "../../../ingredients/services/ingredient.service";
import {switchMap} from "rxjs";
import {IProductVariant} from "../../../../models/product-variant";

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  formGroup!: FormGroup;
  isLoading: boolean = false;
  ingredients!: IIngredient[];
  product!: IProductUpdate;
  id!: number;
  productVariants: IProductVariant[] = [];

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private productService: ProductService, private router: Router, private toastr: ToastrService, private ingredientService: IngredientService) {
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.isLoading = true;
    this.productService.getProductById(this.id).subscribe((res: IProduct) => {
      this.product = {
        name: res.name,
        ingredients: res.ingredients!.map(x => x.id),
        productVariants: res.productVariants!.map(x => x.id!),
      };
      this.productService.getProductVariants().subscribe((result: IProductVariant[]) => {
        this.productVariants = result.filter((variant: IProductVariant) =>{
          const index = this.product.productVariants.findIndex(x => x == variant.id);
          return index != -1;
        });
      });

      this.formGroup = this.formBuilder.group({
        id: [this.id, Validators.required],
        name: [this.product?.name, Validators.required],
        checkboxes: new FormArray([])
      })

      this.ingredientService.getIngredients().subscribe((ingred: IIngredient[]) => {
        this.ingredients = ingred;
        this.ingredients.forEach((_) => (this.formGroup.get('checkboxes') as FormArray).push(new FormControl(false)))
        this.product.ingredients!.forEach((idIngred: number) => {
          const index = this.ingredients.findIndex(x => x.id == idIngred);
          if (index != -1) {
            (this.formGroup.get('checkboxes') as FormArray).at(index).setValue(true);
          }
        })
        this.isLoading = false;
      })
    })
  }

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  updateProduct() {
    this.isLoading = true;
    const arrayControl = (this.formGroup.get('checkboxes') as FormArray);
    const ingredients1 = this.ingredients.filter((_, index) => arrayControl.at(index).value)
      .map((ingredient:IIngredient) => ingredient.id);

    this.product.ingredients = ingredients1;
    this.product.name = this.formGroup.get('name')?.value;

    this.productService.updateProduct(this.id, this.product).subscribe({
      next: (_) => {
        this.isLoading = false;
        this.toastr.success('Successfully updated product!');
        this.goToPage(`/products/` + this.id.toString());
      }, error: (err: any) => this.toastr.error(JSON.stringify(err))
    });
  }
  deleteVariant(variantId: number): void{
      this.productService.deleteProductVariantById(variantId).subscribe((_) => {
        this.toastr.success("Product Variant deleted successfully");
        this.productVariants = this.productVariants.filter((prod: IProduct) => prod.id !== variantId);
      })
  }


}
