import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { IProduct, IProductCreate, IProductUpdate } from "../../../models/product";
import {IProductVariant, IProductVariantCreate, IProductVariantUpdate} from "../../../models/product-variant";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`${environment.apiUrl}/products`, { withCredentials: true });
  }

  addProduct(product: IProductCreate): Observable<IProduct> {
    return this.httpClient.post<IProduct>(`${environment.apiUrl}/products`, product);
  }

  getProductById(productId: number): Observable<IProduct> {
    return this.httpClient.get<IProduct>(`${environment.apiUrl}/products/` + productId.toString());
  }

  deleteProductById(productId: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/products/` + productId.toString());
  }

  updateProduct(id: number, product: IProductUpdate): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}/products/${id}`, product);
  }
}
