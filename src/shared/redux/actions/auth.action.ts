import { ILoginDTO } from '../../../containers/LoginPage/interfaces';
import { createAsyncActions } from './base.action';

export const login = createAsyncActions(
  'AUTH/LOGIN',
  'AUTH/LOGIN_PENDING',
  'AUTH/LOGIN_FULFILLED',
  'AUTH/LOGIN_REJECTED'
)<ILoginDTO, null, any, null>();
