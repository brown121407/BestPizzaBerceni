import { Component, OnInit } from '@angular/core';
import { IOrder } from "../../../../models/order";
import { OrderService } from "../../services/order.service";
import { UserRole } from "../../../../models/user";
import { AccountService } from "../../../account/services/account.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: IOrder[] = [];
  isLoading: boolean = true;

  constructor(
    private orderService: OrderService,
    private accountService: AccountService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.orderService.getOrders()
      .subscribe((orders: IOrder[]) => {
        if (this.accountService.checkRoles([UserRole.StoreEmployee, UserRole.DeliveryEmployee])) {
          this.orders = orders;
        } else {
          this.orders = orders.filter((x: IOrder) => x.address!.user!.id === this.accountService.currentUser!.id);
        }
        this.orders.sort((x, y) => y.id - x.id);
        this.isLoading = false;
      });
  }

  getTotalForOrder(order: IOrder): number {
    return order.orderItems!.reduce((acc, x) => acc + x.productVariant!.price * x.quantity, 0);
  }

  deleteOrder(id: number): void {
    this.orderService.removeOrder(id).subscribe({
      next: (_) => {
        this.orders = this.orders.filter(x => x.id !== id);
        this.toastr.success('Deleted order.');
      }, error: (err: any) => {
        this.toastr.error(JSON.stringify(err));
      }
    });
  }

  canEditOrders(): boolean {
    return this.accountService.checkRole(UserRole.Manager);
  }
}
