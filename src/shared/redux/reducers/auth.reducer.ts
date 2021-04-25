import { ActionType, getType } from 'typesafe-actions';
import * as authActions from '../actions/auth.action';
import { IAuthState } from '../interfaces';

const initialState: IAuthState = {
  isAuthenticated: false,
  user: null,
  error: '',
  loaded: false,
  pending: false
};

export default function authReducer(
  state: IAuthState = initialState,
  action: ActionType<typeof authActions>
): IAuthState {
  switch (action.type) {
    case getType(authActions.login.setPending):
      return {
        ...state,
        pending: true
      };
    case getType(authActions.login.setFulfilled):
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: '',
        loaded: true,
        pending: false
      };
    case getType(authActions.login.setRejected):
      return {
        ...state,
        error: action.message,
        loaded: true,
        pending: false
      };
    default:
      return state;
  }
}
