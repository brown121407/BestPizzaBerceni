import { Injectable } from '@angular/core';
import { RoleGuard } from "./role.guard";
import { rolesAtLeast, UserRole } from "../../../models/user";

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard extends RoleGuard {
  override allowedRoles = rolesAtLeast(UserRole.Customer);
}
