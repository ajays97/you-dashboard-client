import { createAsyncActions } from './base.action';

export const fetchExampleBook = createAsyncActions(
  'BOOKS/FETCH_EXAMPLE_BOOK',
  'BOOKS/FETCH_EXAMPLE_BOOK_PENDING',
  'BOOKS/FETCH_EXAMPLE_BOOK_FULFILLED',
  'BOOKS/FETCH_EXAMPLE_BOOK_REJECTED'
)<null, null, any, null>();
