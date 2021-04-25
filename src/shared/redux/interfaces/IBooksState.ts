import { IBaseState } from "../actions/base.action";

interface Book {
  [key: string]: string;
}

export interface IBooksState extends IBaseState {
  book: Book | null;
}
