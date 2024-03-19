import React, { useState, useRef } from 'react';
import { message } from 'antd';
import './signin.scss';
import HeaderTemplate from '../components/HeaderTemplate';

function Signin() {
  const [idValue, setId] = useState('');
  const [pwValue, setPw] = useState('');
  const [correctPw, setCorrectPw] = useState(false);

  // const confirmPassword = (e: React.FormEvent<HTMLInputElement>) => {
  //   const PASSWORD = '1234';
  //   setPw(e.currentTarget.value);
  //   if (e.currentTarget.value === PASSWORD) {
  //     setCorrectPw(true);
  //   }
  // };

  // const loginAlert = () => {
  //   if (correctPw) {
  //     alert('비밀번호가 맞습니다.');
  //   } else {
  //     alert('비밀번호가 틀립니다.');
  //   }
  // };

  const [account, setAccount] = useState('');
  const passwordRef = useRef('');

  function click() {
    // const password = passwordRef.current.value;
    // if (
    //   account === '' ||
    //   password === '' ||
    //   account == null ||
    //   password == null
    // ) {
    //   message.error('이메일 또는 비밀번호가 입력되지 않았습니다.');
    // } else {
    //   // getUser(account, password);
    // }
  }

  return (
    <>
      {/* <HeaderTemplate /> */}
      <div className="signin-wrapper">
        <h1 className="a11y-hidden">로그인 페이지</h1>
        {/* <img
        className="background-img"
        src="./images/luca.jpg"
        alt="background"
      /> */}
        {/* <div className="background"></div> */}
        {/* <h1><img src="./images/login_logo.png" alt="login_logo" /></h1> */}
        <div className="login-form">
          <form>
            <img src="./images/CINE_SQUARE_logo.svg" />

            <fieldset>
              <legend>로그인</legend>
              <input
                type="text"
                value={account}
                onChange={change}
                placeholder="이메일주소"
                aria-label="이메일"
              />
              <input
                type="password"
                // ref={passwordRef}
                placeholder="비밀번호"
                aria-label="비밀번호"
              />
              <button className="login-btn" onClick={click} type="button">
                로그인
              </button>
              <div className="btn-box">
                <button type="button" className="signup-btn">
                  회원가입
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  // onClick={() => dispatch(push('/'))}
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

  function change(e: any) {
    setAccount(e.target.value);
  }

  // function goSignup() {
  //   dispatch(push('/signup'));
  // }
}

export default Signin;
