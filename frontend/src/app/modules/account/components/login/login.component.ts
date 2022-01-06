import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {AccountService} from "../../services/account.service";
import {IUserLogin} from "../../../../models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required)
  });
  isLoading: boolean = false;
  invalidCredentials: boolean = false;

  constructor(private accountsService: AccountService, private router: Router) { }

  ngOnInit(): void { }

  login(): void {
    this.isLoading = true;
    this.accountsService.login(this.formGroup.value as IUserLogin)
      .subscribe({
        next: (_) => {
          this.router.navigate(['/']);
        },
        error: (_) => {
          this.isLoading = false;
          this.invalidCredentials = true;
        }
      });
  }
}
