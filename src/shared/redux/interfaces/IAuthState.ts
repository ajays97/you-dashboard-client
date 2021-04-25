import { IBaseState } from "../actions/base.action";

interface User {
  _id: string;
  name: string;
  email: string;
}

export interface IAuthState extends IBaseState {
  user: User | null;
  isAuthenticated: boolean;
}
