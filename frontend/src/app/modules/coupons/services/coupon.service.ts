import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ICoupon, ICouponCreate } from "../../../models/coupon";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ICoupon[]> {
    return this.httpClient.get<ICoupon[]>(`${environment.apiUrl}/coupons`);
  }

  getById(id: number): Observable<ICoupon> {
    return this.httpClient.get<ICoupon>(`${environment.apiUrl}/coupons/${id}`);
  }

  create(coupon: ICouponCreate): Observable<ICoupon> {
    return this.httpClient.post<ICoupon>(`${environment.apiUrl}/coupons`, coupon);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/coupons/${id}`);
  }
}
