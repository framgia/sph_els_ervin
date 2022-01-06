export enum ActionTypes {
  registerUser,
  loginUser,
  getCurrentUserToken,
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

type User = {
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
