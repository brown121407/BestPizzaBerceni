import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {IAddress, IAddressUpdate} from "../../../../models/address";
import {UserService} from "../../services/user.service";
import {IUser} from "../../../../models/user";

@Component({
  selector: 'app-address-update',
  templateUrl: './address-update.component.html',
  styleUrls: ['./address-update.component.css']
})
export class AddressUpdateComponent implements OnInit {
  formGroup!: FormGroup;
  isLoading: boolean = false;
  page: string = "";
  address!: IAddressUpdate;
  userId!: number;
  addressId!: number;
  user!: IUser;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('idUser'));
    this.addressId = Number(this.route.snapshot.paramMap.get('idAddress'));
    this.page = "/users/" + this.userId.toString();
    this.isLoading = true;
    this.userService.getUser(this.userId).subscribe(res => {this.user = res
      this.userService.getAddressById(this.addressId).subscribe((res: IAddress) => {
        this.address = {
          county: res.county,
          city: res.city,
          addressLine: res.addressLine,
          postalCode: res.postalCode,
          phoneNumber: res.phoneNumber,
          user: this.userId
        };

        this.formGroup = this.formBuilder.group({
          id: [this.addressId, Validators.required],
          county: [this.address.county, Validators.required],
          city: [this.address.city, Validators.required],
          addressLine: [this.address.addressLine, Validators.required],
          phoneNumber: [this.address.phoneNumber, Validators.required],
          postalCode: [this.address.postalCode, Validators.required],
          user: [this.userId]
        });
        this.isLoading = false;
      })
    });
  }

  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  updateAddress(): void {
    this.isLoading = true;
    this.userService.updateAddress(this.addressId, this.formGroup.value).subscribe({
      next: (_) => {
        this.isLoading = false;
        this.toastr.success('Successfully updated address!');
        this.goToPage(`/users/` + this.userId.toString());
      }, error: (err: any) => this.toastr.error(JSON.stringify(err))
    });
  }
}
