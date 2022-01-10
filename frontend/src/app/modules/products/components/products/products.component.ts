import { Component, OnInit } from '@angular/core';
import {IProduct} from "../../../../models/product";
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {IIngredient} from "../../../../models/ingredient";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [];
  isLoading: boolean = false;

  constructor(private productService: ProductService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((res: IProduct[]) =>{
      this.products = res;
      console.log(this.products);
  }
  );
  }
  deleteProduct(productid: number){
    this.productService.deleteProductById(productid).subscribe((_) =>{
      {
        this.toastr.success("Ingredient deleted successfully");
        this.products = this.products.filter((prod: IProduct) => prod.id !== productid);
      }
    })
  }

}
