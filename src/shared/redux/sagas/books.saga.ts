import autobind from 'autobind-decorator';
import { inject, injectable } from 'inversify';
import {
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  takeLatest
} from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import { BooksService } from '../../../services';
import { serviceTypes } from '../../types';
import { fetchExampleBook } from '../actions/books.action';
import { BaseSaga } from './base.saga';

@injectable()
export class BooksSaga extends BaseSaga {
  constructor(
    @inject(serviceTypes.BooksService) private booksService: BooksService
  ) {
    super();
  }

  @autobind
  public *fetchExampleBook(): IterableIterator<CallEffect | PutEffect<any>> {
    try {
      yield put(fetchExampleBook.setPending(null));
      const book: any = yield call(this.booksService.getExampleBook);
      yield put(fetchExampleBook.setFulfilled(book));
    } catch (error) {
      yield put(fetchExampleBook.setRejected(null, error.toString()));
    }
  }

  protected *registerListeners(): IterableIterator<ForkEffect> {
    yield takeLatest(getType(fetchExampleBook.invoke), this.fetchExampleBook);
  }
}
