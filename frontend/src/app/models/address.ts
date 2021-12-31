import {IUser} from "./user";
import {IOrder} from "./order";

export interface IAddress {
  id: number;
  county: string;
  city: string;
  addressLine: string;
  postalCode: string;
  phoneNumber: string;

  user?: IUser;
  order?: IOrder;
}
