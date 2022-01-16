export enum UserRole {
  Admin = 'Admin',
  Manager = 'Manager',
  StoreEmployee = 'Store Employee',
  DeliveryEmployee = 'Delivery Employee',
  LoyalCustomer = 'Loyal Customer',
  Customer = 'Customer'
}

export const allRoles: UserRole[] = [
  UserRole.Admin,
  UserRole.Manager,
  UserRole.StoreEmployee,
  UserRole.DeliveryEmployee,
  UserRole.LoyalCustomer,
  UserRole.Customer
];

export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  roles: UserRole[];
  token: string;

  addresses: number[];
}

export interface IUserSignup {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirmation: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export function rolesAtLeast(role: UserRole): UserRole[] {
  switch (role) {
    case UserRole.StoreEmployee:
      return [UserRole.StoreEmployee, UserRole.Manager, UserRole.Admin];
    case UserRole.DeliveryEmployee:
      return [UserRole.DeliveryEmployee, UserRole.Manager, UserRole.Admin];
    case UserRole.Customer:
      return [UserRole.Customer, UserRole.LoyalCustomer, UserRole.Admin];
    case UserRole.LoyalCustomer:
      return [UserRole.LoyalCustomer, UserRole.Admin];
    case UserRole.Manager:
      return [UserRole.Manager, UserRole.Admin];
    case UserRole.Admin:
      return [UserRole.Admin];
    default:
      return [];
  }
}

export function checkRoles(user: IUser | null, expectedRole: UserRole): boolean {
  if (!user) {
    return false;
  }
  const allowedRoles = rolesAtLeast(expectedRole);
  return allowedRoles.some((r: UserRole) => user.roles.includes(r));
}
