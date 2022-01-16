import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { IProduct } from "../../../../models/product";

@Component({
  selector: 'app-select-variant-dialog',
  templateUrl: './select-variant-dialog.component.html',
  styleUrls: ['./select-variant-dialog.component.css']
})
export class SelectVariantDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SelectVariantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public product: IProduct,
  ) { }

  ngOnInit(): void {
    console.log(this.product);
  }
}
