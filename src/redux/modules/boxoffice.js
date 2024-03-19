import BoxOfficeService from '../../service/BoxOfficeService';
import { put, call, takeEvery } from 'redux-saga/effects';

const prefix = 'CINESQUARE/BOXOFFICE';

const GET_BOXOFFICE_START = `${prefix}/GET_BOXOFFICE_START`;
const GET_BOXOFFICE_SUCCESS = `${prefix}/GET_BOXOFFICE_SUCCESS`;
const GET_BOXOFFICE_FAIL = `${prefix}/GET_BOXOFFICE_FAIL`;

const getBoxOfficeListStart = () => ({
  type: GET_BOXOFFICE_START,
});

const getBoxOfficeListSuccess = (value) => ({
  type: GET_BOXOFFICE_SUCCESS,
  value,
});

const getBoxOfficeListFail = (error) => ({
  type: GET_BOXOFFICE_FAIL,
  error,
});

const initialState = {
  boxOfficeList: [],
  loading: false,
  error: null,
};

// reducer
export default function reducer(state = initialState, action) {
  const value = action.value;
  switch (action.type) {
    case GET_BOXOFFICE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_BOXOFFICE_SUCCESS:
      return {
        ...state,
        boxOfficeList: value,
        loading: false,
        error: null,
      };
    case GET_BOXOFFICE_FAIL:
      return {
        ...state,
        boxOfficeList: [],
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

const START_GET_BOXOFFICE_LIST = 'START_GET_BOXOFFICE_LIST';

export const startGetBoxOfficeListActionCreator = () => ({
  type: START_GET_BOXOFFICE_LIST,
});

function* startGetBoxOfficeListSaga(action) {
  yield put(getBoxOfficeListStart());
  try {
    const response = yield call(BoxOfficeService.getBoxOfficeList);
    yield put(getBoxOfficeListSuccess(response));
  } catch (error) {
    console.log(error);
    yield put(getBoxOfficeListFail(error));
  }
}

// 8. 최종 saga-reducer
export function* getBoxOfficeListSaga() {
  yield takeEvery(START_GET_BOXOFFICE_LIST, startGetBoxOfficeListSaga);
}
