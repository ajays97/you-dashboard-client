import { all, AllEffect } from 'redux-saga/effects';
import { diContainer } from '../../../config/inversify.config';
import { AuthSaga } from './auth.saga';
import { BooksSaga } from './books.saga';
import { sagaTypes } from '../../types';

const booksSaga = diContainer.get<BooksSaga>(sagaTypes.BooksSaga);
const authSaga = diContainer.get<AuthSaga>(sagaTypes.AuthSaga);

export default function* rootSaga(): IterableIterator<AllEffect<any>> {
  yield all([booksSaga.watch()]);
  yield all([authSaga.watch()]);
}
