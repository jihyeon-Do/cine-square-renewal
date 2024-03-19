import { all } from 'redux-saga/effects';
import { getSearchValueSaga } from '../modules/search';
import { getBoxOfficeListSaga } from '../modules/boxoffice';
import { AuthSaga } from '../modules/auth';

export default function* rootSaga() {
  yield all([getSearchValueSaga(), getBoxOfficeListSaga(), AuthSaga()]);
}
