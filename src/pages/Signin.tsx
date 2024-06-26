import React, { useState, useEffect } from 'react';
import { Cookies } from 'react-cookie';
import { message } from 'antd';
import './signin.scss';
import logo from '../images/main_logo.svg';
import { useNavigate } from 'react-router-dom';
import APIService from '../service/APIService';

import axios from 'axios';

function Signin() {
  const [isEmail, setIsEmail] = useState(false);
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [isValidation, setIsValidation] = useState({
    confirm: false,
  });

  const navigate = useNavigate();
  const LOCALAPI = APIService.LOCALAPI;

  const cookies = new Cookies();

  async function click() {
    try {
      const response = await axios.post(`${LOCALAPI}/api/auth/sign-in`, {
        account: account,
        password: password,
      });
      console.log(response);
      if (response.data.data.access_token) {
        setIsValidation({
          ...isValidation,
          confirm: false,
        });
        sessionStorage.setItem('token', response.data.data.access_token);
        // sessionStorage.setItem(
        //   'refresh-token',
        //   response.data.data.refresh_token,
        // );
        cookies.set('Refresh-Token', response.data.data.refresh_token, {
          path: '/',
          secure: false,
        });
        // const refresh = cookies.get('refreshToken');
        // document.cookie = `refreshToken=${response.data.data.refresh_token}; Secure; SameSite=Strict`;
        alert('로그인성공');
        navigate('/');
      }
    } catch (error) {
      setIsValidation({
        ...isValidation,
        confirm: true,
      });
      console.log(error);
    }
  }

  function change(e: React.ChangeEvent<HTMLInputElement>, text: string) {
    if (text === 'email') {
      setAccount(e.target.value);
      const regex = /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/;
      const isValidation = regex.test(e.target.value);

      if (isValidation) {
        setIsEmail(true);
      } else {
        setIsEmail(false);
      }
    } else if (text === 'password') {
      setPassword(e.target.value);
    }
  }

  return (
    <>
      {/* <HeaderTemplate /> */}
      <div className="signin-wrapper">
        <h1 className="a11y-hidden">로그인 페이지</h1>
        <div className="login-form">
          <form>
            <img src={logo} onClick={() => navigate('/')} />
            <fieldset>
              <legend>로그인</legend>
              <div className="input-box">
                <input
                  type="text"
                  value={account}
                  onChange={(e) => change(e, 'email')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && isEmail && password !== '') {
                      click();
                    }
                  }}
                  placeholder="이메일주소"
                  aria-label="이메일"
                />
                {!isEmail && account !== '' && (
                  <p>이메일 형식에 맞지 않습니다.</p>
                )}
              </div>
              <div className="input-box">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => change(e, 'password')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && isEmail && password !== '') {
                      click();
                    }
                  }}
                  placeholder="비밀번호"
                  aria-label="비밀번호"
                />
              </div>
              <p className="login-result">
                {isValidation.confirm
                  ? '이메일 또는 비밀번호가 맞지 않습니다.'
                  : ''}
              </p>
              <button
                className="login-btn"
                onClick={click}
                type="button"
                disabled={!isEmail || password === ''}
              >
                로그인
              </button>
              <div className="btn-box">
                <button
                  type="button"
                  className="signup-btn"
                  onClick={() => navigate('/signup')}
                >
                  회원가입
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => navigate('/')}
                >
                  취소
                </button>
              </div>
              {/* 
            <div className="social-btn">
              <p>소셜로그인</p>
              <ul>
                <li>
                  <button
                    type="button"
                    className="kakao_btn"
                    // onClick={loginWithKakao}
                  >
                    카카오로그인
                  </button>
                </li>
                <li>
                  <div className="naver-btn" id="naverIdLogin" />
                </li>
              </ul>
            </div> */}
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );

  // function goSignup() {
  //   dispatch(push('/signup'));
  // }
}

export default Signin;
