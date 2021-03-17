import { User } from "../models/User";

export const ADD_USER = "ADD_USER";
export const REMOVE_USER = "REMOVE_USER";

export interface AddUserAction {
  type: typeof ADD_USER;
  payload: User;
}

export interface RemoveUserAction {
  type: typeof REMOVE_USER;
}
