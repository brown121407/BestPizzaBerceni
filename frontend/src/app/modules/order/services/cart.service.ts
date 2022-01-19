import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ICartItem, ICartItemCreate, ICartItemUpdate } from "../../../models/cart-item";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private httpClient: HttpClient) { }

  getCartItemsOfUser(userId: number): Observable<ICartItem[]> {
    return this.httpClient.get<ICartItem[]>(`${environment.apiUrl}/cartItems?user.id=${userId}`);
  }

  addCartItem(cartItem: ICartItemCreate): Observable<ICartItem> {
    return this.httpClient.post<ICartItem>(`${environment.apiUrl}/cartItems`, cartItem);
  }

  updateCartItem(id: number, cartItem: ICartItemUpdate): Observable<any> {
    return this.httpClient.put<ICartItem>(`${environment.apiUrl}/cartItems/${id}`, cartItem);
  }

  removeCartItem(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/cartItems/${id}`);
  }
}
