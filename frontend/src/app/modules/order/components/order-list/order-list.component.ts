import { Component, OnInit } from '@angular/core';
import { IOrder } from "../../../../models/order";
import { OrderService } from "../../services/order.service";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: IOrder[] = [];
  isLoading: boolean = true;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.orderService.getOrders()
      .subscribe((orders: IOrder[]) => {
        this.orders = orders;
        this.isLoading = false;
      });
  }
}
