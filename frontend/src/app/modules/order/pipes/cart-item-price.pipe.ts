import { Pipe, PipeTransform } from '@angular/core';
import { ICartItem } from "../../../models/cart-item";

@Pipe({
  name: 'cartItemPrice'
})
export class CartItemPricePipe implements PipeTransform {
  transform(cartItem: ICartItem, ...args: any[]): number {
    return cartItem!.productVariant!.price * cartItem!.quantity;
  }
}
