import { IStore } from '../interfaces';

export const booksSelector = (state: Pick<IStore, 'books'>) => state.books;
