import { ISearchItem } from "./SearchItems";

export interface AuthState {
    auth: {
      token: string;
      userId: string;
      error: {message: string};
      loading: boolean;
      searchValue: string;
      favourites: ISearchItem[];
    };
  }

export interface IAuthErrorCodes {
  [index: string] : string
}

export const errorCodes: IAuthErrorCodes = {
  'EMAIL_NOT_FOUND' : 'The email or password is not correct',
  'INVALID_PASSWORD' : 'The email or password is not correct',
  'MISSING_PASSWORD' : 'Please enter a password',
  'USER_DISABLED' : 'The account has been locked by the administrator',
  'EMAIL_EXISTS': 'The email address is already in use by another account',
  'INVALID_EMAIL': 'The email or password is not correct',
  'OPERATION_NOT_ALLOWED' : 'Password sign-in is disabled for this project',
  'TOO_MANY_ATTEMPTS_TRY_LATER' : 'We have blocked all requests from this device due to unusual activity. Try again later.'
};