export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
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
