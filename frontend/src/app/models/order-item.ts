import {IProductVariant} from "./product-variant";
import {ICoupon} from "./coupon";
import {IOrder} from "./order";

export interface IOrderItem {
  id: number;

  coupon?: ICoupon;
  productVariant?: IProductVariant;
  order?: IOrder;
}
