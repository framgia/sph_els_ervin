import { updateUser } from './auth';
export enum types {
  registerUserRequest,
  registerUserSuccess,
  registerUserError,
  loginUserRequest,
  loginUserSuccess,
  loginUserError,
  logoutUserRequest,
  logoutUserSuccess,
  logoutUserError,
  updateUser,
  userListRequest,
  userListSuccess,
  userListError,
  userDataRequest,
  userDataSuccess,
  userDataError,
  followUserRequest,
  followUserSuccess,
  followUserError,
  unfollowUserRequest,
  unfollowUserSuccess,
  unfollowUserError,
  getFollowListRequest,
  getFollowListSuccess,
  getFollowListError,
}
export interface RegistrationData {
  email: string;
  name: string;
  password: string;
  password_confirmation: string;
}
export interface RegisterUserAction {
  type:
    | types.registerUserRequest
    | types.registerUserError
    | types.registerUserSuccess;
  payload?: AuthenticationPayloadData;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginUserAction {
  type: types.loginUserRequest | types.loginUserError | types.loginUserSuccess;
  payload?: AuthenticationPayloadData;
}

export interface UserToken {
  currentUserToken: string;
}

export interface UsersListData {
  users: User[];
}
export interface UsersListAction {
  type: types.userListRequest | types.userListSuccess | types.userListError;
  payload?: UsersListData;
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

export interface SessionData {
  token: string;
  user: User;
}

export interface AuthenticationPayloadData {
  SessionData: SessionData;
}

export interface LogoutData {
  user_id: number;
  token: string;
}

export interface LogoutUserAction {
  type: types;
  payload?: LogoutData;
}

export interface UserTokenAction {
  type: types;
  payload: LoginData | RegistrationData | LogoutData;
}

export interface UserDataAction {
  type: types;
  payload?: User;
}

export interface FollowRequestData {
  follower: number;
  following: number;
}

export interface FollowUserAction {
  type: types;
  payload?: FollowData;
}

export interface UnfollowUserAction {
  type: types;
  payload?: FollowData;
}

export interface FollowData {
  id: number;
  follower_id: number;
  following_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface GetFollowListAction {
  type: types;
  payload?: FollowData[];
}
