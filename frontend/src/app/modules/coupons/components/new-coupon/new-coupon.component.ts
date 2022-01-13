import { Component, OnInit } from '@angular/core';
import { CouponService } from "../../services/coupon.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../../users/services/user.service";
import { IUser } from "../../../../models/user";
import { ICouponCreate } from "../../../../models/coupon";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: 'app-new-coupon',
  templateUrl: './new-coupon.component.html',
  styleUrls: ['./new-coupon.component.css']
})
export class NewCouponComponent implements OnInit {
  formGroup!: FormGroup;
  users!: IUser[];
  isLoading: boolean = false;

  constructor(
    private couponService: CouponService,
    private userService: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.formGroup = this.fb.group({
      discount: [1, Validators.required],
      user: [null, Validators.required]
    });

    this.userService.getUsers()
      .subscribe(
        (users: IUser[]) => {
          this.users = users;
          this.isLoading = false;
        }
      )
  }

  submit(): void {
    this.isLoading = true;
    const coupon: ICouponCreate = {
      discount: this.formGroup.get('discount')?.value,
      user: this.formGroup.get('user')?.value.id
    };

    this.couponService.create(coupon)
      .subscribe({
        next: (_) => {
          this.toastr.success('Successfully create a coupon.');
          this.router.navigate(['coupons', 'list']);
        },
        error: (err: any) => {
          this.toastr.error(JSON.stringify(err));
        },
        complete: () => {
          this.isLoading = false;
        }
      })
  }

  displayUser(user: IUser | null): string {
    if (user) {
      return `${user.firstName} ${user.lastName}`;
    }
    return '';
  }
}
