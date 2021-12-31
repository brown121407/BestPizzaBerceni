import {IProduct} from "./product";

export interface IIngredient {
  id: number;
  name: string;
  allergen: boolean;
  spicy: boolean;

  products?: IProduct[];
}
