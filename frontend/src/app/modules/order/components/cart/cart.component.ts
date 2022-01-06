import { Component, OnInit } from '@angular/core';
import { ICartItem } from "../../../../models/cart-item";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  // TODO Remove this when we can add items to the cart from the menu.
  cartItems: ICartItem[] = [
    {
      id: 1,
      quantity: 2,
      productVariant: {
        id: 1,
        name: 'Mare',
        quantity: 500,
        unit: 'g',
        price: 35,
        product: {
          id: 1,
          name: 'Pizza Margherita',
          ingredients: [
            {
              id: 1,
              name: 'Blat',
              allergen: false,
              spicy: false
            }
          ]
        }
      }
    },
    {
      id: 1,
      quantity: 2,
      productVariant: {
        id: 1,
        name: 'Medie',
        quantity: 400,
        unit: 'g',
        price: 26,
        product: {
          id: 2,
          name: 'Pizza Casei',
          ingredients: [
            {
              id: 1,
              name: 'Blat',
              allergen: false,
              spicy: false
            },
            {
              id: 2,
              name: 'Ciuperci',
              allergen: false,
              spicy: false
            }
          ]
        }
      }
    }
  ];
  hasChanged: boolean = false;

  constructor() { }

  getTotal(): number {
    return this.cartItems.reduce((acc, x) => acc + x!.quantity * x!.productVariant!.price, 0);
  }

  ngOnInit(): void { }

  modifyCartItem(): void {
    this.hasChanged = true;
  }

  emptyCart(): void {
    this.cartItems = [];
    this.hasChanged = true;
  }

  updateCart(): void {
    // TODO send the current cart items to the backend.
    this.hasChanged = false;
  }

  order(): void {
    // TODO create an order with the current cart items.
  }
}
