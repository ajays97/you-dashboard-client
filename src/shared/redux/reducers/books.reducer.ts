import { ActionType, getType } from 'typesafe-actions';
import * as booksActions from '../actions/books.action';
import { IBooksState } from '../interfaces';

const initialState: IBooksState = {
  book: null,
  error: '',
  loaded: false,
  pending: false
};

export default function booksReducer(
  state: IBooksState = initialState,
  action: ActionType<typeof booksActions>
): IBooksState {
  switch (action.type) {
    case getType(booksActions.fetchExampleBook.setPending):
      return {
        ...state,
        pending: true
      };
    case getType(booksActions.fetchExampleBook.setFulfilled):
      return {
        ...state,
        book: action.payload,
        error: '',
        loaded: true,
        pending: false
      };
    case getType(booksActions.fetchExampleBook.setRejected):
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
