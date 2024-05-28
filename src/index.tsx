import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './styles/reset.scss';
import './styles/common.scss';

import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { store, history } from './redux/create';

// import create, { sagaMiddleware } from './redux/create';

// 초기화시점

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
