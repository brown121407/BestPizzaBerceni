import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {ToastrService} from "ngx-toastr";
import {IProductVariant, IProductVariantUpdate} from "../../../../models/product-variant";
import { ProductVariantService } from "../../services/product-variant.service";

@Component({
  selector: 'app-product-variant-update',
  templateUrl: './product-variant-update.component.html',
  styleUrls: ['./product-variant-update.component.css']
})
export class ProductVariantUpdateComponent implements OnInit {
  formGroup!: FormGroup;
  isLoading: boolean = false;
  variant!: IProductVariantUpdate;
  productId!: number;
  variantId!: number;
  page: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private productVariantService: ProductVariantService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('idProd'));
    this.variantId = Number(this.route.snapshot.paramMap.get('idVariant'));
    this.page = "/products/" + this.productId.toString();
    this.isLoading = true;

    this.productVariantService.getProductVariantsById(this.variantId).subscribe( (res:IProductVariant) => {
      this.variant = {
        name: res.name,
        quantity: res.quantity,
        unit: res.unit,
        price: res.price,
        product: this.productId
      };

      this.formGroup = this.formBuilder.group({
        id: [this.variantId, Validators.required],
        name: [this.variant.name, Validators.required],
        quantity: [this.variant.quantity, Validators.required],
        unit: [this.variant.unit, Validators.required],
        price: [this.variant.price, Validators.required],
        product: [this.productId]
      });
      this.isLoading = false;
    });
  }

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  updateProductVariant(): void {
    this.isLoading = true;
    this.productVariantService.updateProductVariant(this.variantId, this.formGroup.value).subscribe({
      next: (_) => {
        this.isLoading = false;
        this.toastr.success('Successfully updated product variant!');
        this.goToPage(`/variants/` + this.productId.toString());
      }, error: (err: any) => this.toastr.error(JSON.stringify(err))
    });
  }
}
