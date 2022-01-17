import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {AccountService} from "./modules/account/services/account.service";
import {IUser} from "./models/user";
import {NavigationEnd, Router} from "@angular/router";
import {Subject, Subscription, takeUntil} from "rxjs";
import { MatSidenav } from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  title = 'BestPizzaBerceni';
  isLoggedIn: boolean = false;
  userId: number | null = null;

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit() {
    this.accountService.currentUser$
      .subscribe((user: IUser | null) => {
        this.isLoggedIn = !!user;
        if (user) {
          this.userId = user.id;
        }
      });
  }

  logOut() {
    this.accountService.logout();
    this.router.navigateByUrl('/refresh', { skipLocationChange: true })
      .then(() => this.router.navigate(['/']));
  }

  toggleSidenav(): void {
    this.sidenav.toggle();
  }
}
