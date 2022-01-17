import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import { IUser, UserRole } from "../../../../models/user";
import {IAddress} from "../../../../models/address";
import { AccountService } from "../../../account/services/account.service";
import { switchMap } from "rxjs";

@Component({
  selector: 'app-address-add',
  templateUrl: './address-add.component.html',
  styleUrls: ['./address-add.component.css']
})
export class AddressAddComponent implements OnInit {
  isLoading: boolean = false;
  formGroup: FormGroup = new FormGroup({
    'county': new FormControl('', Validators.required),
    'city': new FormControl('', Validators.required),
    'addressLine': new FormControl('', Validators.required),
    'postalCode': new FormControl('', Validators.required),
    'phoneNumber': new FormControl('', Validators.required)
  });
  user!: IUser;
  address!: IAddress;
  id!: number;
  page: string = "";

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('idUser'));
    if (!this.accountService.checkRole(UserRole.Admin) && this.id !== this.accountService.currentUser!.id) {
      this.toastr.error('You don\'t have the permissions to edit this user.');
      this.router.navigate(['']);
      return;
    }
    this.isLoading = true;
    this.page = "/users/" + this.id.toString();
    this.userService.getUser(this.id).subscribe( (res: IUser) => {
      this.user = res;
      this.isLoading = false;
    });
  }

  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  addAddress(): void {
    this.isLoading = true;
    const address = {
      county: this.formGroup.get('county')!.value,
      city: this.formGroup.get('city')!.value,
      postalCode: this.formGroup.get('postalCode')!.value,
      addressLine: this.formGroup.get('addressLine')!.value,
      phoneNumber: this.formGroup.get('phoneNumber')!.value,
      user: this.id
    };

    this.userService.addAddress(address)
      .pipe(
        switchMap(
          (_) => this.accountService.refreshCurrentUser()
        )
      )
      .subscribe({
        next: (_) => {
          this.isLoading = false;
          this.toastr.success('Address added successfully');
          this.goToPage(`/users/` + this.id!.toString());
        },
        error: (_) => {
          this.toastr.error('Couldn\'t add address.');
          this.isLoading = false;
        }
      });
  }
}
