// import { boundMethod } from "autobind-decorator";
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

import { AuthService } from '../../../services';
import { serviceTypes } from '../../types';
import { authActions } from '../actions';
import { BaseSaga } from './base.saga';

@injectable()
export class AuthSaga extends BaseSaga {
  constructor(
    @inject(serviceTypes.AuthService) private authService: AuthService
  ) {
    super();
  }

  @autobind
  public *login(
    action: ReturnType<typeof authActions.login.invoke>
  ): IterableIterator<CallEffect | PutEffect<any>> {
    try {
      yield put(authActions.login.setPending(null));
      const authInfo: any = yield call(this.authService.login, action.payload);
      console.log(authInfo);
      yield put(authActions.login.setFulfilled(authInfo));
    } catch (error) {
      yield put(authActions.login.setRejected(null, error.toString()));
    }
  }

  protected *registerListeners(): IterableIterator<ForkEffect> {
    yield takeLatest(getType(authActions.login.invoke), this.login);
  }
}
