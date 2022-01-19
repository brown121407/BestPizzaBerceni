import { Component, OnInit } from '@angular/core';
import { ICartItem, ICartItemUpdate } from "../../../../models/cart-item";
import { OrderService } from "../../services/order.service";
import { AccountService } from "../../../account/services/account.service";
import { forkJoin, switchMap } from "rxjs";
import { IOrder } from "../../../../models/order";
import { ToastrService } from "ngx-toastr";
import { IUser, UserRole } from "../../../../models/user";
import { IAddress } from "../../../../models/address";
import { UserService } from "../../../users/services/user.service";
import { Router } from "@angular/router";
import { AddressService } from "../../../users/services/address.service";
import { CartService } from "../../services/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: ICartItem[] = [];
  isLoading: boolean = false;
  hasChanged: boolean = false;
  selectedAddressId: number | null = null;
  user!: IUser;
  addresses: IAddress[] = [];

  constructor(
    private orderService: OrderService,
    private accountService: AccountService,
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router,
    private addressService: AddressService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.user = this.accountService.currentUser!;
    this.isLoading = true;
    this.cartService.getCartItemsOfUser(this.user.id)
      .pipe(switchMap((cartItems: ICartItem[]) => {
        this.cartItems = cartItems;

        return this.addressService.getAddresses();
      }))
      .subscribe((addresses: IAddress[]) => {
        this.addresses = addresses.filter((address: IAddress) =>{
          const index = this.user.addresses.findIndex((x: number) => x == address.id);
          return index != -1;
        });

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
      return this.cartService.removeCartItem(x.id);
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
        return this.cartService.removeCartItem(x.id);
      }

      const cartItem: ICartItemUpdate = {
        quantity: x.quantity,
        user: x.user!.id,
        productVariant: x.productVariant!.id!
      };

      return this.cartService.updateCartItem(x.id, cartItem);
    });

    forkJoin(observables).subscribe((_) => {
      this.isLoading = false;
      this.hasChanged = false;
      this.cartItems = this.cartItems.filter((x) => x.quantity > 0);
    });
  }

  order(): void {
    this.orderService.createOrder(this.cartItems, this.selectedAddressId!)
      .subscribe({
        next: (_: IOrder) => {
          this.toastr.success('Successfully created order.');
          this.router.navigate(['orders', 'list']);
        }, error: (err: any) => {
          this.toastr.error(JSON.stringify(err));
        }
      });
  }
}
