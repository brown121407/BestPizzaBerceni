export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  token: string;
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
