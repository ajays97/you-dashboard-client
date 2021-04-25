import { CombinedState, combineReducers, Reducer } from 'redux';
import booksReducer from './books.reducer';
import authReducer from './auth.reducer';
import { IStore } from '../interfaces';

const rootReducer: Reducer<CombinedState<IStore>> = combineReducers<IStore>({
  books: booksReducer,
  auth: authReducer
});

export default rootReducer;
