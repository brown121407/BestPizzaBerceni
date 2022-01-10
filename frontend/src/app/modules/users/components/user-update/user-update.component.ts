import { Component, OnInit } from '@angular/core';
import {IUser} from "../../../../models/user";
import {Form, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  user!: IUser;
  isLoading: boolean = false;
  id!: number;
  roles: string[] = ['admin', 'mananger', 'store-employee', 'loyal-customer', 'customer', 'delivery-employee'];
  // formGroup: FormGroup = new FormGroup({
  //   'id' : new FormControl(0, Validators.required),
  //   'firstname': new FormControl('ana', Validators.required),
  //   'lastname': new FormControl('', Validators.required),
  //   'admin': new FormControl(false),
  //   'manager': new FormControl(false),
  //   'store-employee': new FormControl(false),
  //   'delivery-employee': new FormControl(false),
  //   'loyal-customer': new FormControl(false),
  //   'customer': new FormControl(false),
  // });
  formGroup!: FormGroup;

  constructor(private userService: UserService, private router: Router, private route:ActivatedRoute, private toastr: ToastrService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.isLoading = true;
    this.userService.getUser(this.id).subscribe((user: IUser) => {
      this.user = user;
      this.formGroup = this.fb.group({
        id: [this.user?.id, Validators.required],
        firstname: [this.user?.firstName, Validators.required],
        lastname: [this.user?.lastName, Validators.required],
        checkboxes: new FormArray([])
        //tre sa iau rolurile pe care le are acum din roles
      });
      this.roles.forEach((_) => (this.formGroup.get('checkboxes') as FormArray).push(new FormControl(false)))
      this.user.roles.forEach((name: string) => {
        const index = this.roles.findIndex(x => x == name);
        if (index != -1)
        {
          (this.formGroup.get('checkboxes') as FormArray).at(index).setValue(true);
        }
      })
      this.isLoading = false;
    });
  }

  goToPage(pageName: string){
    this.router.navigate([`${pageName}`]);
  }

  updateUsr():void {
    this.isLoading = true;
    console.log(this.formGroup.value);
    if(typeof(this.formGroup.getRawValue()) != "undefined") {
      this.userService.updateUser(this.formGroup.value).subscribe({
        next: (_) => {
          this.isLoading = false;
          this.toastr.success('Successfully updated user!');
          this.goToPage(`/users/list`)
        },
        error: (err: any) => this.toastr.error(JSON.stringify(err))
      })
    }
  }

}
