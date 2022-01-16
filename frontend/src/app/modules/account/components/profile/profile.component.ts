import { Component, OnInit } from '@angular/core';
import {IUser} from "../../../../models/user";
import {AccountService} from "../../services/account.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  formGroup!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.accountService.currentUser$.subscribe((user: IUser | null) => {
      console.log(user);
      this.formGroup = this.fb.group({
        firstName: [user?.firstName, Validators.required],
        lastName: [user?.lastName, Validators.required],
        email: [user?.email, Validators.required],
        id: [user?.id, Validators.required],
        roles: this.fb.array(user!.roles, Validators.required),
        addresses: this.fb.array(user!.addresses),
        token: user?.token
      });

      this.isLoading = false;
    });
  }

  updateUser(): void {
    this.isLoading = true;
    this.accountService.updateProfile(this.formGroup.value as IUser)
      .subscribe({
        next: (_) => {
          this.toastr.success('Successfully updated profile!');
        },
        error: (err: any) => this.toastr.error(JSON.stringify(err)),
        complete: () => {
          this.isLoading = false;
        }
      });
  }
}
