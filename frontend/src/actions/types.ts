export enum ActionTypes {
  registerUser,
  loginUser,
  logoutUser,
}

export interface RegistrationData {
  email: string;
  name: string;
  password: string;
  password_confirmation: string;
}
export interface RegisterUserAction {
  type: ActionTypes.registerUser;
  payload: AuthenticationPayloadData;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginUserAction {
  type: ActionTypes.loginUser;
  payload: AuthenticationPayloadData;
}

export interface UserToken {
  currentUserToken: string;
}

export type User = {
  avatar: string;
  email: string;
  id: number;
  is_admin: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  email_verified_at?: Date;
};

export interface AuthenticationPayloadData {
  token: string;
  user: User;
}

export interface LogoutData {
  user_id: number;
}

export interface LogoutUserAction {
  type: ActionTypes.logoutUser;
  payload: LogoutData;
}

export interface UserTokenActions {
  type: ActionTypes;
  payload: LoginData | RegistrationData | LogoutData;
}
