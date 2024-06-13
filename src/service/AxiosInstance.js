import axios from 'axios';
import APIService from './APIService';
import { Cookies } from 'react-cookie';

const LOCALAPI = APIService.LOCALAPI;
const access_token = sessionStorage.getItem('token');

const cookies = new Cookies();

//: axios instance 생성
export const api = axios.create({
  baseURL: LOCALAPI,
  headers: {
    Authorization: `Bearer ${access_token}`,
    'Content-Type': 'application/json',
  },
});

//: refresh token api
export async function postRefreshToken(refreshToken) {
  const response = await axios.post(
    `${LOCALAPI}/api/auth/reissue-access-token`,
    {},
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Refresh-Token': refreshToken,
      },
    },
  );
  return response;
}

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.withCredentials = true;
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

    //: 토큰이 만료되었을 때
    if (status === 403) {
      if (error.message === 'Request failed with status code 403') {
        try {
          const refreshToken = cookies.get('Refresh-Token');
          if (!refreshToken) {
            //: refresh token이 없을 때
            sessionStorage.removeItem('token');
            cookies.remove('Refresh-Token');
            alert('재로그인이 필요합니다');
            window.location.replace('/signin');
            return Promise.reject(error);
          }
          const retryResponse = await postRefreshToken(refreshToken);
          //: 리프레시 토큰 요청이 성공했을 때
          const newAccessToken = retryResponse.data.data.access_token;
          const newRefreshToken = retryResponse.data.data.refresh_token;
          sessionStorage.setItem('token', newAccessToken);
          cookies.set('Refresh-Token', newRefreshToken, {
            path: '/',
          });
          config.headers.Authorization = `Bearer ${newAccessToken}`;
          const refetch = api(config);
          return refetch;
        } catch (refreshError) {
          //: 쿠키 포함해서 요청 후 에러 났을 때
          cookies.remove('Refresh-Token');
          sessionStorage.removeItem('token');
          alert('재로그인이 필요합니다');
          window.location.replace('/signin');
        }
      }
    }
    return Promise.reject(error);
  },
);
