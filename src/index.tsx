import 'reflect-metadata';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ContainerProvider } from './shared/hooks';
import { diContainer } from './config/inversify.config';

ReactDOM.render(
  <React.StrictMode>
    <ContainerProvider container={diContainer}>
      <App />
    </ContainerProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
