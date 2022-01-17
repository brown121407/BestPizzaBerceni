import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { forkJoin, Observable, switchMap } from "rxjs";
import { ICartItem, ICartItemCreate, ICartItemUpdate } from "../../../models/cart-item";
import { environment } from "../../../../environments/environment";
import { IOrder, IOrderCreate } from "../../../models/order";
import { IOrderItem, IOrderItemCreate } from "../../../models/order-item";
import { IAddress } from "../../../models/address";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
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

  getOrders(): Observable<IOrder[]> {
    return this.httpClient.get<IOrder[]>(`${environment.apiUrl}/orders`);
  }

  getOrderById(id: number): Observable<IOrder> {
    return this.httpClient.get<IOrder>(`${environment.apiUrl}/orders/${id}`);
  }

  createOrder(cartItems: ICartItem[], addressId: number): Observable<any> {
    const order: IOrderCreate = { address: addressId };
    let orderId: number;
    console.log(order);

    return this.httpClient.post<IOrder>(`${environment.apiUrl}/orders`, order)
      .pipe(
        switchMap(
          (order: IOrder) => {
            orderId = order.id;
            const orderItems: IOrderItemCreate[] = cartItems.map((x: ICartItem) => {
              return {
                quantity: x.quantity,
                order: order.id,
                productVariant: x.productVariant!.id
              } as IOrderItemCreate;
            });

            const observables = orderItems.map((orderItem) => {
              return this.httpClient.post(`${environment.apiUrl}/orderItems`, orderItem);
            });

            return forkJoin(observables);
          }
        ),
        switchMap(
          (_) => {
            return this.getOrderById(orderId)
          }
        )
      );
  }

  removeOrder(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/orders/${id}`);
  }
}
