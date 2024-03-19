import { combineReducers } from 'redux';
import reducer from './reducer';
import search from './search';
import boxoffice from './boxoffice';
import auth from './auth';
export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = () =>
  combineReducers({
    reducer,
    search,
    boxoffice,
    auth,
  });

export default rootReducer;
