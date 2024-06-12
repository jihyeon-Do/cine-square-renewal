import axios from 'axios';
import APIService from './APIService';
import { Cookies } from 'react-cookie';

const LOCALAPI = APIService.LOCALAPI;
const access_token = sessionStorage.getItem('token');

const cookies = new Cookies();
const refresh = cookies.get('refreshToken');

//: axios instance 생성
export const api = axios.create({
  baseURL: LOCALAPI,
  headers: {
    Authorization: `Bearer ${access_token}`,
    'Content-Type': 'application/json',
  },
});

const retryRequestWithCredentials = async (originalRequest) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    originalRequest.headers.Authorization = `Bearer ${token}`;
  }
  originalRequest.withCredentials = true;
  console.log(originalRequest);
  return axios(originalRequest);
};

//: refresh token api
// export async function postRefreshToken() {
//   const response = await api.post('/api/auth/reissue-access-token', {
//     refreshToken: refresh_token,
//   });
//   return response;
// }

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

    // 2 1 1 1

    //: 토큰이 만료되었을 때
    if (status === 403) {
      if (error.message === 'Request failed with status code 403') {
        try {
          const refreshToken = cookies.get('refreshToken');
          if (!refreshToken) {
            //: refresh token이 없을 때
            sessionStorage.removeItem('token');
            cookies.remove('refreshToken');
            alert('재로그인이 필요합니다.1');
            window.location.replace('/signin');
            return Promise.reject(error);
          }
          //: 동일한 요청을 withCredentials: true로 다시 시도
          const retryResponse = await retryRequestWithCredentials(config);
          console.log(retryResponse);
          //: 리프레시 토큰 요청이 성공했을 때
          const newAccessToken = retryResponse.data.data.access_token;
          const newRefreshToken = retryResponse.data.data.refresh_token;
          sessionStorage.setItem('token', newAccessToken);
          cookies.set('refreshToken', newRefreshToken, {
            path: '/',
            // httpOnly: true,
          });
          //: response return하기
        } catch (refreshError) {
          //: 쿠키 포함해서 요청 후 에러 났을 때
          console.log(refreshError);
          // cookies.remove('refreshToken');
          // sessionStorage.removeItem('token');
          // console.error('Token refresh failed', refreshError);
          // alert('재로그인이 필요합니다.2');
          // window.location.replace('/signin');
        }
        const originRequest = config;
      }
    }
    return Promise.reject(error);
  },
);
