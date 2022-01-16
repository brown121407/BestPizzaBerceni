import { Component, OnInit } from '@angular/core';
import { ICartItem, ICartItemUpdate } from "../../../../models/cart-item";
import { OrderService } from "../../services/order.service";
import { AccountService } from "../../../account/services/account.service";
import { forkJoin } from "rxjs";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: ICartItem[] = [];
  isLoading: boolean = false;
  hasChanged: boolean = false;

  constructor(private orderService: OrderService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.orderService.getCartItemsOfUser(this.accountService.currentUser!.id)
      .subscribe((cartItems: ICartItem[]) => {
        this.cartItems = cartItems;
        this.isLoading = false;
      });
  }

  getTotal(): number {
    return this.cartItems.reduce((acc, x) => acc + x!.quantity * x!.productVariant!.price, 0);
  }

  modifyCartItem(): void {
    this.hasChanged = true;
  }

  emptyCart(): void {
    this.isLoading = true;
    const observables = this.cartItems.map((x: ICartItem) => {
      return this.orderService.removeCartItem(x.id);
    });

    forkJoin(observables).subscribe((_) => {
      this.isLoading = false;
      this.cartItems = [];
    });
  }

  updateCart(): void {
    this.isLoading = true;
    const observables = this.cartItems.map((x: ICartItem) => {
      if (x.quantity === 0) {
        return this.orderService.removeCartItem(x.id);
      }

      const cartItem: ICartItemUpdate = {
        quantity: x.quantity,
        user: x.user!.id,
        productVariant: x.productVariant!.id!
      };

      return this.orderService.updateCartItem(x.id, cartItem);
    });

    forkJoin(observables).subscribe((_) => {
      this.isLoading = false;
      this.hasChanged = false;
      this.cartItems = this.cartItems.filter((x) => x.quantity > 0);
    });
  }

  order(): void {
    // TODO create an order with the current cart items.
  }
}
