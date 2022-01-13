import { Component, OnInit } from '@angular/core';
import { ICoupon } from "../../../../models/coupon";
import { AccountService } from "../../../account/services/account.service";
import { UserRole } from "../../../../models/user";
import { CouponService } from "../../services/coupon.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-coupons-list',
  templateUrl: './coupons-list.component.html',
  styleUrls: ['./coupons-list.component.css']
})
export class CouponsListComponent implements OnInit {
  coupons: ICoupon[] = [];
  isLoading: boolean = true;

  constructor(
    private accountService: AccountService,
    private couponService: CouponService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.couponService.getAll()
      .subscribe(
        (coupons: ICoupon[]) => {
          this.coupons = coupons;
          this.isLoading = false;
        }
      );
  }

  delete(id: number): void {
    this.couponService.delete(id)
      .subscribe((_) => {
        this.toastr.success('Deleted coupon.')
        this.coupons = this.coupons.filter((x) => x.id !== id);
      });
  }

  isAtLeastManager(): boolean {
    return this.accountService.checkRoles(UserRole.Manager);
  }
}
