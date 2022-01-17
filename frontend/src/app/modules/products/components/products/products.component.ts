import { Component, OnInit } from '@angular/core';
import { IProduct } from "../../../../models/product";
import { ProductService } from "../../services/product.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AccountService } from "../../../account/services/account.service";
import { UserRole } from "../../../../models/user";
import { MatDialog } from "@angular/material/dialog";
import { SelectVariantDialogComponent } from "../select-variant-dialog/select-variant-dialog.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [];
  isLoading: boolean = false;

  constructor(
    private accountService: AccountService,
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((res: IProduct[]) => {
      this.products = res;
    });
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProductById(productId).subscribe((_) =>{
      {
        this.toastr.success("Ingredient deleted successfully");
        this.products = this.products.filter((prod: IProduct) => prod.id !== productId);
      }
    });
  }

  addToCart(product: IProduct): void {
    this.dialog.open(SelectVariantDialogComponent, {
      data: product
    });
  }

  userCanEdit(): boolean {
    return this.accountService.checkRole(UserRole.Manager);
  }

  userCanOrder(): boolean {
    return this.accountService.checkRole(UserRole.Customer)
  }
}
