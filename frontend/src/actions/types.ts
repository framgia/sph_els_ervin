export enum registerTypes {
  registerUserRequest,
  registerUserSuccess,
  registerUserError,
}

export enum loginTypes {
  loginUserRequest,
  loginUserSuccess,
  loginUserError,
}

export enum logoutTypes {
  logoutUserRequest,
  logoutUserSuccess,
  logoutUserError,
}
export interface RegistrationData {
  email: string;
  name: string;
  password: string;
  password_confirmation: string;
}
export interface RegisterUserAction {
  type: registerTypes;
  payload?: AuthenticationPayloadData;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginUserAction {
  type: loginTypes;
  payload?: AuthenticationPayloadData;
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
  SessionData: {
    token: string;
    user: User;
  };
}

export interface LogoutData {
  user_id: number;
  token: string;
}

export interface LogoutUserAction {
  type: logoutTypes;
  payload?: LogoutData;
}

export interface UserTokenActions {
  type: registerTypes | loginTypes | logoutTypes;
  payload: LoginData | RegistrationData | LogoutData;
}
