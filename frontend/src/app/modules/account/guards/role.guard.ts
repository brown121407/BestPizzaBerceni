import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRole } from "../../../models/user";
import { AccountService } from "../services/account.service";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  protected allowedRoles: UserRole[] = [];
  redirectRoute: string[] = [''];

  constructor(
    private router: Router,
    private accountService: AccountService,
    private toastr: ToastrService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.allowedRoles.some((r: UserRole) => this.accountService.currentUser?.roles.includes(r)))
    {
      return true;
    }

    this.toastr.error(`You don\'t have any of the required roles: ${this.allowedRoles.join(', ')}.`);
    this.router.navigate(this.redirectRoute);
    return false;
  }

}
