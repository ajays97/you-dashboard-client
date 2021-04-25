import { IBooksState } from ".";
import { IAuthState } from "./IAuthState";

export interface IStore {
  books: IBooksState;
  auth: IAuthState;
}
