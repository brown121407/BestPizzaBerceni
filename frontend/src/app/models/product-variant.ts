import {IProduct} from "./product";
import {ICartItem} from "./cart-item";
import {IOrderItem} from "./order-item";

export interface IProductVariant {
  id?: number;
  name: string;
  quantity: number;
  unit: string;
  price: number;

  product?: IProduct;
  cartItems?: ICartItem[];
  orderItems?: IOrderItem[];
}

export interface IProductVariantCreate {
  name: string;
  quantity: number;
  unit: string;
  price: number;

  product: number;
}

export interface IProductVariantUpdate extends IProductVariantCreate { }
