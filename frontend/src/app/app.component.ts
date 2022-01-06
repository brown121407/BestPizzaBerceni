import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from "./modules/account/services/account.service";
import {IUser} from "./models/user";
import {NavigationEnd, Router} from "@angular/router";
import {Subject, Subscription, takeUntil} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BestPizzaBerceni';
  isLoggedIn: boolean = false;

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit() {
    this.accountService.currentUser$
      .subscribe((user: IUser | null) => { this.isLoggedIn = !!user; });
  }

  logOut() {
    this.accountService.logout();
    this.router.navigateByUrl('/refresh', { skipLocationChange: true })
      .then(() => this.router.navigate(['/']));
  }
}
