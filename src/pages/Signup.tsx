import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.scss';
import HeaderTemplate from '../components/HeaderTemplate';
import axios from 'axios';

function Signup() {
  const [account, setAccount] = useState('');
  const [userName, setUserName] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState({
    isName: false,
    isNickname: false,
    isEmail: false,
    isPw: false,
    duplication: false,
  });

  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const LOCALAPI = 'http://3.38.64.130:8080';

  function onChange(e: React.ChangeEvent<HTMLInputElement>, text: string) {
    if (text === 'name') {
      setUserName(e.target.value);
      const regex = /^[가-힣a-zA-Z]{2,12}$/;
      const isValidation = regex.test(e.target.value);
      if (isValidation) {
        setValidation({
          ...validation,
          isName: true,
        });
      } else {
        setValidation({
          ...validation,
          isName: false,
        });
      }
    } else if (text === 'nickname') {
      setNickname(e.target.value);
      const regex = /^[가-힣a-zA-Z0-9]{1,12}$/;
      const isValidation = regex.test(e.target.value);

      if (isValidation) {
        setValidation({
          ...validation,
          isNickname: true,
        });
      } else {
        setValidation({
          ...validation,
          isNickname: false,
        });
      }
    } else if (text === 'email') {
      setAccount(e.target.value);
      const regex = /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/;
      const isValidation = regex.test(e.target.value);

      if (isValidation) {
        setValidation({
          ...validation,
          isEmail: true,
        });
      } else {
        setValidation({
          ...validation,
          isEmail: false,
        });
      }
    } else if (text === 'password') {
      setPassword(e.target.value);
      const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
      const isValidation = regex.test(e.target.value);

      if (isValidation) {
        setValidation({
          ...validation,
          isPw: true,
        });
      } else {
        setValidation({
          ...validation,
          isPw: false,
        });
      }
    }
  }

  async function click() {
    try {
      const isDuplication = await axios.get(
        `${LOCALAPI}/api/users/check-account/${account}`,
      );
      if (!isDuplication.data.result) {
        const response = await axios.post(`${LOCALAPI}/api/users`, {
          account: account,
          password: password,
          name: userName,
          nickname: nickname,
        });
        if (response.data.data.user_id) {
          alert('회원가입 성공');
          navigate('/');
        }
      } else {
        setValidation({
          ...validation,
          duplication: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {/* <HeaderTemplate /> */}
      <div className="signup-wrapper">
        <h1 className="a11y-hidden">회원가입 페이지</h1>
        {/* <img
        className="background-img"
        src="./images/luca.jpg"
        alt="background"
      /> */}
        {/* <div className="background"></div> */}
        {/* <h1><img src="./images/login_logo.png" alt="login_logo" /></h1> */}
        <div className="signup-form">
          <form>
            <img
              src="./images/CINE_SQUARE_logo.svg"
              onClick={() => navigate('/')}
            />
            <fieldset>
              <legend>회원가입</legend>
              <div className="input-box">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => onChange(e, 'name')}
                  placeholder="이름"
                  aria-label="이름"
                />
                {!validation.isName && userName !== '' && (
                  <p>영문 또는 한글로 2-12자 이상 입력하세요.</p>
                )}
              </div>
              <div className="input-box">
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => onChange(e, 'nickname')}
                  placeholder="닉네임"
                  aria-label="닉네임"
                />
                {!validation.isNickname && nickname !== '' && (
                  <p>영문 또는 한글로 1-12자 이상 입력하세요.</p>
                )}
              </div>
              <div className="input-box">
                <input
                  type="text"
                  value={account}
                  onChange={(e) => onChange(e, 'email')}
                  placeholder="이메일주소"
                  aria-label="이메일"
                />
                {!validation.isEmail && account !== '' && (
                  <p>이메일 형식에 맞지 않습니다.</p>
                )}
              </div>
              <div className="input-box">
                <input
                  type="password"
                  ref={passwordRef}
                  value={password}
                  onChange={(e) => onChange(e, 'password')}
                  placeholder="비밀번호"
                  aria-label="비밀번호"
                />
                {!validation.isPw && password !== '' && (
                  <p>
                    영문, 숫자, 특수문자를 모두 혼합하여 8-20자리여야 합니다.
                  </p>
                )}
              </div>
              {/* <button className="signup-btn" type="button">
                회원가입
              </button> */}
              {validation.duplication && (
                <p className="email-duplication">이미 존재하는 이메일입니다.</p>
              )}
              <div className="btn-box">
                <button
                  type="button"
                  className="signup-btn"
                  disabled={
                    !(
                      validation.isEmail &&
                      validation.isName &&
                      validation.isNickname &&
                      validation.isPw
                    )
                  }
                  onClick={click}
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
              <div className="signin-box">
                <p>
                  이미 가입하셨나요?{' '}
                  <button onClick={() => navigate('/signin')}>로그인</button>
                </p>
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

export default Signup;
