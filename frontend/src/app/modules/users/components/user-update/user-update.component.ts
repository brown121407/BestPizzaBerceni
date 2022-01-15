import { Component, OnInit } from '@angular/core';
import {IUser, UserRole} from "../../../../models/user";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {allRoles} from "../../../../models/user";
import {IAddress} from "../../../../models/address";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  user!: IUser;
  isLoading: boolean = false;
  id!: number;
  roles: UserRole[] = allRoles;
  formGroup!: FormGroup;
  addresses: IAddress[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private route:ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.isLoading = true;
    this.userService.getUser(this.id).subscribe((user: IUser) => {
      this.user = user;
      this.formGroup = this.fb.group({
        id: [this.user?.id, Validators.required],
        firstname: [this.user?.firstName, Validators.required],
        lastname: [this.user?.lastName, Validators.required],
        roles: new FormArray([])
      });
      this.userService.getAddresses().subscribe(res => {
        this.addresses = res.filter((address: IAddress) =>{
          const index = this.user.addresses.findIndex((x: number) => x == address.id);
          return index != -1;
        });
      });
      this.roles.forEach((_) => (this.formGroup.get('roles') as FormArray).push(new FormControl(false)));
      this.user.roles.forEach((role : UserRole) => {
        const index = this.roles.findIndex(x => x === role); //rolesString
        if (index != -1)
          (this.formGroup.get('roles') as FormArray).at(index).setValue(true);
      });
      this.isLoading = false;
    });
  }

  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  updateUsr(): void {
    this.isLoading = true;
    if (this.formGroup.value) {
      const arrayControl = this.formGroup.get('roles') as FormArray;
      const roles1 = this.roles.filter((role: string, index: number) => arrayControl.at(index).value);
      this.user.lastName = this.formGroup.get('lastname')!.value;
      this.user.firstName = this.formGroup.get('firstname')!.value;
      this.user.roles = roles1;
      this.userService.updateUser(this.user).subscribe({
        next: (_) => {
          this.isLoading = false;
          this.toastr.success('Successfully updated user!');
          this.goToPage(`/users/list`)
        },
        error: (err: any) => this.toastr.error(JSON.stringify(err))
      });
    }
  }

  deleteAddress(id: number): void {
    this.userService.deleteAddressById(id).subscribe((_) => {
      this.toastr.success("Address deleted successfully");
      this.addresses = this.addresses.filter((prod: IAddress) => prod.id !== id);
    });
  }
}
