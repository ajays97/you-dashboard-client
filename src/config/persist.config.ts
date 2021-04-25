import { PersistConfig } from 'redux-persist';
import * as localforage from 'localforage';
import { IStore } from '../shared/redux/interfaces';

export const persistConfig: PersistConfig<IStore> = {
  key: 'root',
  version: 1,
  storage: localforage,
  whitelist: ['auth']
};
