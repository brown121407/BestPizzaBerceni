import {IOrderItem} from "./order-item";
import {IOrderStatusUpdate} from "./order-status-update";
import {IAddress} from "./address";

export interface IOrder {
  id: number;

  address?: IAddress;
  orderStatusUpdates?: IOrderStatusUpdate[];
  orderItems?: IOrderItem[];
}

export interface IOrderCreate {
  address: number;
}
