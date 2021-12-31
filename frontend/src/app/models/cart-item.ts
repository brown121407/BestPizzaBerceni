import {IProductVariant} from "./product-variant";
import {IUser} from "./user";

export interface ICartItem {
  id: number;
  quantity: number;

  productVariant?: IProductVariant;
  user?: IUser;
}
