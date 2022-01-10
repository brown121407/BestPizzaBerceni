import {IIngredient} from "./ingredient";
import { IProductVariant } from "./product-variant";

export interface IProduct {
  id?: number;
  name: string;

  ingredients?: IIngredient[];
  productVariants?: IProductVariant[];
}

export interface IProductCreate {
  name: string;

  ingredients: number[];
  productVariants: number[];
}

export interface IProductUpdate extends IProductCreate { }
