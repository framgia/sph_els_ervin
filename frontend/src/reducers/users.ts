import { UsersListAction, types } from '../actions/types';
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
