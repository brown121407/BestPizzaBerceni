import {IOrderItem} from "./order-item";
import {IUser} from "./user";

export interface ICoupon {
  id: number;
  discount: number;

  user?: IUser;
  orderItem?: IOrderItem;
}
