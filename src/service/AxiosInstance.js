import axios from 'axios';
import APIService from './APIService';

const LOCALAPI = APIService.LOCALAPI;
const access_token = sessionStorage.getItem('token');
const refresh_token = sessionStorage.getItem('refresh-token');

//: axios instance 생성
export const api = axios.create({
  baseURL: LOCALAPI,
  headers: {
    Authorization: `Bearer ${access_token}`,
    'Content-Type': 'application/json',
  },
});

//: refresh token api
export async function postRefreshToken() {
  const response = await api.post('/api/auth/reissue-access-token', {
    refreshToken: refresh_token,
  });
  return response;
}

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

//: 응답 가로채기
api.interceptors.response.use(
  //: 응답이 200번일때
  (response) => {
    return response;
  },
  //: 응답이 200번이 아닐 때
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    console.log(error);

    //: 토큰이 만료되었을 때
    if (status === 403) {
      if (error.response.data.message === 'Unauthorized') {
        const originRequest = config;
        //: 리프레시토큰 api
        const response = await postRefreshToken();
        //: 리프레시 토큰 요청이 성공했을 때
        if (response.status === 200) {
          const newAccessToken = response.data.token;
          sessionStorage.setItem('token', newAccessToken);
          //   sessionStorage.setItem('refresh-token', response.data.refreshToken);
          axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
          originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originRequest);
        } else if (response.status === 404) {
          alert('재로그인 요청');
          window.location.replace('/sign-in');
        } else {
          alert('에러가 발생했습니다.');
        }
      }
    }
    return Promise.reject(error);
  },
);
