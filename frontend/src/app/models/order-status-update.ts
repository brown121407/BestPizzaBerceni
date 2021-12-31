import {IOrder} from "./order";

export interface IOrderStatusUpdate {
  id: number;
  status: string;
  timestamp: Date;

  order?: IOrder;
}
