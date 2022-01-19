import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { IProductVariant, IProductVariantCreate, IProductVariantUpdate } from "../../../models/product-variant";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductVariantService {
  constructor(private httpClient: HttpClient) { }

  getProductVariants(): Observable<IProductVariant[]> {
    return this.httpClient.get<IProductVariant[]>(`${environment.apiUrl}/productvariants/`, {withCredentials: true});
  }

  addProductVariant(productVariant: IProductVariantCreate) {
    return this.httpClient.post(`${environment.apiUrl}/productvariants/`, productVariant);
  }

  getProductVariantsById(id: number): Observable<IProductVariant> {
    return this.httpClient.get<IProductVariant>(`${environment.apiUrl}/productvariants/` + id.toString());
  }

  deleteProductVariantById(idProductVariant: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/productvariants/` + idProductVariant.toString());
  }

  updateProductVariant(id: number, variant: IProductVariantUpdate): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}/productvariants/${id}`, variant);
  }
}
