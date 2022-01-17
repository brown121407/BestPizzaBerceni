import {IProductVariant} from "./product-variant";
import {ICoupon} from "./coupon";
import {IOrder} from "./order";

export interface IOrderItem {
  id: number;
  quantity: number;

  coupon?: ICoupon;
  productVariant?: IProductVariant;
  order?: IOrder;
}

export interface IOrderItemCreate {
  quantity: number;

  productVariant: number;
  order: number;
}
