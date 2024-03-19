import { put, call, takeEvery } from 'redux-saga/effects';
import SearchService from '../../service/SearchService';

// 루트사가에 추가, 리덕스 스토어에 사가 추가

// 1. 액션 start, success, error 3가지
const prefix = 'CINESQUARE/SEARCH';

const GET_SEARCHVALUE_START = `${prefix}/GET_SEARCHVALUE_START`;
const GET_SEARCHVALUE_SUCCESS = `${prefix}/GET_SEARCHVALUE_SUCCESS`;
const GET_SEARCHVALUE_FAIL = `${prefix}/GET_SEARCHVALUE_FAIL`;

const GET_SEARCHLIST_START = `${prefix}/GET_SEARCHLIST_START`;
const GET_SEARCHLIST_SUCCESS = `${prefix}/GET_SEARCHLIST_SUCCESS`;
const GET_SEARCHLIST_FAIL = `${prefix}/GET_SEARCHLIST_FAIL`;

// 2. 액션 생성자 함수 action creator
const getSearchValueStart = () => ({
  type: GET_SEARCHVALUE_START,
});

const getSearchValueSuccess = (value) => ({
  type: GET_SEARCHVALUE_SUCCESS,
  value,
});

const getSearchValueFail = (error) => ({
  type: GET_SEARCHVALUE_FAIL,
  error,
});

const getSearchListStart = () => ({
  type: GET_SEARCHLIST_START,
});

const getSearchListSuccess = (list) => ({
  type: GET_SEARCHLIST_SUCCESS,
  list,
});

const getSearchListFail = (error) => ({
  type: GET_SEARCHLIST_FAIL,
  error,
});

// 3. initial state
const initialState = {
  value: '',
  list: [],
  loading: false,
  error: null,
};

// 4. reducer
export default function reducer(state = initialState, action) {
  const value = action.value;
  const list = action.list;

  switch (action.type) {
    case GET_SEARCHVALUE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_SEARCHVALUE_SUCCESS:
      return {
        ...state,
        value: value,
        loading: false,
        error: null,
      };
    case GET_SEARCHVALUE_FAIL:
      return {
        ...state,
        value: '',
        loading: false,
        error: action.error,
      };
    case GET_SEARCHLIST_START:
      return {
        ...state,
        list: [],
        loading: false,
        error: action.error,
      };
    case GET_SEARCHLIST_SUCCESS:
      return {
        ...state,
        list: list,
        loading: false,
        error: action.error,
      };
    case GET_SEARCHLIST_FAIL:
      return {
        ...state,
        list: [],
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

// 5. saga-action
const START_GET_SEARCH_VALUE = 'START_GET_SEARCH_VALUE';
const START_GET_SEARCH_LIST = 'START_GET_SEARCH_LIST';

// const SUCCESS_GET_SEARCH_VALUE = `${prefix}/SUCCESS_GET_SEARCH_VALUE`;
// const FAIL_GET_SEARCH_VALUE = `${prefix}/FAIL_GET_SEARCH_VALUE`;

// 6. saga-action 생성자 만들기
export const startGetSearchValueActionCreator = (value) => ({
  type: START_GET_SEARCH_VALUE,
  payload: {
    value,
  },
});

export const startGetSearchListActionCreator = (value) => ({
  type: START_GET_SEARCH_LIST,
  payload: {
    value,
  },
});

// 7. saga-reducer
function* startGetSearchValueSaga(action) {
  // console.log(action);
  try {
    yield put(getSearchValueStart());
    const { value } = action.payload;
    yield put(getSearchValueSuccess(value));
  } catch (error) {
    console.log(error);
    yield put(getSearchValueFail(error));
  }
}

function* startGetSearchListSaga(action) {
  try {
    yield put(getSearchListStart());
    const { value } = action.payload;
    // aws 에 올라가면 주석 열면 된다. 지금 닫아놓은 이유는 서버에 올라가있지 않기 때문에 에러 발생함
    const list = yield call(SearchService.getSearchList, value);
    // const list = [];

    yield put(getSearchListSuccess(list));
  } catch (error) {
    console.log(error);
    yield put(getSearchListFail(error));
  }
}

// 8. 최종 saga-reducer
export function* getSearchValueSaga() {
  yield takeEvery(START_GET_SEARCH_VALUE, startGetSearchValueSaga);
  yield takeEvery(START_GET_SEARCH_LIST, startGetSearchListSaga);
}
