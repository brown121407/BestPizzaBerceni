import { Component, OnInit } from '@angular/core';
import { ICoupon } from "../../../../models/coupon";
import { AccountService } from "../../../account/services/account.service";
import { UserRole } from "../../../../models/user";

@Component({
  selector: 'app-coupons-list',
  templateUrl: './coupons-list.component.html',
  styleUrls: ['./coupons-list.component.css']
})
export class CouponsListComponent implements OnInit {
  coupons!: ICoupon[];

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {

  }

  isAtLeastManager(): boolean {
    return this.accountService.checkRoles(UserRole.Manager);
  }
}
