import { IStore } from '../interfaces';

export const authSelector = (state: Pick<IStore, 'auth'>) => state.auth;
