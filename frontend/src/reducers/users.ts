import { UsersListAction, types, UserDataAction } from '../actions/types';

export const getUsersListReducer = (state = [], action: UsersListAction) => {
  switch (action.type) {
    case types.userListRequest:
      return {
        ...state,
        userListLoading: true,
      };
    case types.userListSuccess:
      return {
        ...state,
        userListLoading: false,
        users: action.payload,
      };
    default:
      return state;
  }
};

export const getUserDataReducer = (
  state = [{ userDataLoading: false }],
  action: UserDataAction
) => {
  switch (action.type) {
    case types.userDataRequest:
      return {
        ...state,
        userDataLoading: true,
      };
    case types.userDataSuccess:
      return {
        ...state,
        userDataLoading: false,
        user: action.payload,
      };
    default:
      return state;
  }
};
