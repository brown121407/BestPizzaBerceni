import { Injectable } from '@angular/core';
import { RoleGuard } from "./role.guard";
import { rolesAtLeast, UserRole } from "../../../models/user";

@Injectable({
  providedIn: 'root'
})
export class LoyalCustomerGuard extends RoleGuard {
  override allowedRoles = rolesAtLeast(UserRole.LoyalCustomer);
}
