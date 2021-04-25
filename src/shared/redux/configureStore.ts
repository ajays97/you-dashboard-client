import { applyMiddleware, createStore, Middleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import createSagaMiddleware, { Task } from 'redux-saga';
import { persistReducer, persistStore } from 'redux-persist';

import rootReducer from './reducers';
import rootSaga from './sagas';
import { persistConfig } from '../../config/persist.config';
import { Persistor } from 'redux-persist/es/types';
import { IStore } from './interfaces';

interface IExtendedStore {
  store: Store<Partial<IStore>>;
  persistor: Persistor;
  runSaga: Task;
}

export function configureStore(initialState?: Partial<IStore>): IExtendedStore {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares: Middleware[] = [sagaMiddleware];

  const isDevEnv = process.env.NODE_ENV === 'development';

  if (isDevEnv) {
    const logger = createLogger();
    middlewares.push(logger);
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(
    persistedReducer,
    undefined,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  const persistor = persistStore(store);

  return {
    store,
    persistor,
    runSaga: sagaMiddleware.run(rootSaga)
  };
}
