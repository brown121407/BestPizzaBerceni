import { Injectable } from '@angular/core';
import { rolesAtLeast, UserRole } from "../../../models/user";
import { RoleGuard } from "./role.guard";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard extends RoleGuard {
  override allowedRoles = rolesAtLeast(UserRole.Admin);
}
