import './App.less';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import RootRouter from './routes/root.router';
import { configureStore } from './shared/redux/configureStore';

const { store, persistor } = configureStore();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootRouter />
      </PersistGate>
    </Provider>
  );
}

export default App;
