import { createStore, applyMiddleware, combineReducers } from 'redux';
import rootReducer from './modules/index';
import { composeWithDevTools } from '@redux-devtools/extension';
import createSagaMiddleware from 'redux-saga';
// import { routerMiddleware } from 'connected-react-router';
import { createReduxHistoryContext, reachify } from 'redux-first-history';
import { createWouterHook } from 'redux-first-history/wouter';
import { createBrowserHistory } from 'history';
import rootSaga from './middleware/saga';
import TokenService from '../service/TokenService';
import AccountService from '../service/AccountService';

export const sagaMiddleware = createSagaMiddleware();

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({ history: createBrowserHistory() });

export const store = createStore(
  combineReducers({
    router: routerReducer,
  }),
  {
    auth: {
      token: TokenService.get(),
      account: AccountService.getAccount(),
      userName: AccountService.getUserName(),
      loading: false,
      error: null,
    },
  },
  composeWithDevTools(
    applyMiddleware(sagaMiddleware),
    applyMiddleware(routerMiddleware),
  ),
);
sagaMiddleware.run(rootSaga);
export const history = createReduxHistory(store);
export const reachHistory = reachify(history);
export const wouterUseLocation = createWouterHook(history);
