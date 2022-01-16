import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { IProduct } from "../../../../models/product";
import { OrderService } from "../../../order/services/order.service";
import { ICartItemCreate } from "../../../../models/cart-item";
import { AccountService } from "../../../account/services/account.service";
import { ToastrService } from "ngx-toastr";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-select-variant-dialog',
  templateUrl: './select-variant-dialog.component.html',
  styleUrls: ['./select-variant-dialog.component.css']
})
export class SelectVariantDialogComponent implements OnInit {
  selectedIndex!: number;

  constructor(
    public dialogRef: MatDialogRef<SelectVariantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public product: IProduct,
    private orderService: OrderService,
    private accountService: AccountService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void { }

  addToCart(): void {
    const cartItem: ICartItemCreate = {
      productVariant: this.product.productVariants![this.selectedIndex].id!,
      user: this.accountService.currentUser!.id,
      quantity: 1
    };

    this.orderService.addCartItem(cartItem)
      .subscribe((_) => {
        this.toastr.success('Successfully added item to cart.');
        this.dialogRef.close();
      });
  }
}
