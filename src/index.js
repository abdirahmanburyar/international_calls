import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import './index.css';
import { persistor, store } from './redux/store';
import reportWebVitals from './reportWebVitals';
ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <PersistGate persistor={persistor}>
    <Router>
      <Provider store={store}>
      <App />
    </Provider>
    </Router>
    </PersistGate>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
