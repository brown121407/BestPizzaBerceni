import { Pipe, PipeTransform } from '@angular/core';
import { IOrderItem } from "../../../models/order-item";

@Pipe({
  name: 'orderItemPrice'
})
export class OrderItemPricePipe implements PipeTransform {
  transform(orderItem: IOrderItem, ...args: any[]): number {
    return orderItem!.productVariant!.price * orderItem!.quantity;
  }
}
