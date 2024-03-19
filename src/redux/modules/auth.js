import { put, call, takeEvery, cancel } from 'redux-saga/effects';
import UserService from '../../service/UserService';
import { push } from 'redux-first-history';

const prefix = 'CINESQUARE/AUTH';

// action
const LOGIN_START = `${prefix}/LOGIN_START`;
const LOGIN_SUCCESS = `${prefix}/LOGIN_SUCCESS`;
const LOGIN_FAIL = `${prefix}/LOGIN_FAIL`;

// Logout 도 만들어야 함
const LOGOUT_START = `${prefix}/LOGOUT_START`;
const LOGOUT_SUCCESS = `${prefix}/LOGOUT_SUCCESS`;
const LOGOUT_FAIL = `${prefix}/LOGOUT_FAIL`;

// 2. 액션 생성자 함수 action creator
const loginStart = () => ({
  type: LOGIN_START,
});

const loginSuccess = (token, account, userName) => ({
  type: LOGIN_SUCCESS,
  token,
  account,
  userName,
});

const loginFail = (error) => ({
  type: LOGIN_FAIL,
  error,
});

const logoutStart = () => ({
  type: LOGOUT_START,
});

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

const logoutFail = (error) => ({
  type: LOGOUT_FAIL,
  error,
});

// 3. initial state
const initialState = {
  token: null,
  account: null,
  userName: null,
  loading: false,
  error: null,
};

// 4. reducer
export default function reducer(state = initialState, action) {
  const token = action.token;
  const account = action.account;
  const userName = action.userName;
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: token,
        account: account,
        userName: userName,
        loading: false,
        error: null,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        token: null,
        loading: false,
        error: action.error,
      };
    case LOGOUT_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        token: null,
        account: null,
        userName: null,
        loading: false,
        error: null,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        token: null,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

// 5. saga-action
const START_GET_USER_INFO = 'START_GET_USER_INFO';
const START_LOGOUT_USER = 'START_LOGOUT_USER';

// 6. saga-action 생성자 만들기
export const startGetUserInfoActionCreator = (account_id, password) => ({
  type: START_GET_USER_INFO,
  payload: {
    account_id,
    password,
  },
});

export const startLogoutActionCreator = () => ({
  type: START_LOGOUT_USER,
});

// 7. saga-reducer
function* startGetUserInfoSaga(action) {
  try {
    yield put(loginStart());
    const { account_id, password } = action.payload;
    const user = yield call(UserService.getUserInfo, account_id, password);
    if (!user) {
      yield cancel();
      return false;
    }
    const { cineToken, account, userName } = user;
    yield put(loginSuccess(cineToken, account, userName));
    // const history = yield getContext('history');
    // history.push('/');
    yield put(push('/'));
  } catch (error) {
    console.log(error);
    yield put(loginFail(error));
  }
}

function* startLogoutSaga(action) {
  try {
    yield put(logoutStart());
    yield put(logoutSuccess());
  } catch (error) {
    console.log(error);
    yield put(logoutFail(error));
  }
}

// 8. 최종 saga-reducer
export function* AuthSaga() {
  yield takeEvery(START_GET_USER_INFO, startGetUserInfoSaga);
  yield takeEvery(START_LOGOUT_USER, startLogoutSaga);
}
