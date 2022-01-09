import {IIngredient} from "./ingredient";

export interface IProduct {
  id?: number;
  name: string;

  ingredients?: IIngredient[];
}
