import React, { useState } from 'react';

function Login() {
  const [idValue, setId] = useState('');
  const [pwValue, setPw] = useState('');
  const [correctPw, setCorrectPw] = useState(false);

  const confirmPassword = (e: React.FormEvent<HTMLInputElement>) => {
    const PASSWORD = '1234';
    setPw(e.currentTarget.value);
    if (e.currentTarget.value === PASSWORD) {
      setCorrectPw(true);
    }
  };

  const loginAlert = () => {
    if (correctPw) {
      alert('비밀번호가 맞습니다.');
    } else {
      alert('비밀번호가 틀립니다.');
    }
  };

  return (
    <>
      <div className="inputBox">
        <label htmlFor="">
          <input type="text" className="idInput" value={idValue} />
        </label>
        <label htmlFor="">
          <input
            type="password"
            className="passwordInput"
            value={pwValue}
            onChange={confirmPassword}
          />
        </label>
        <button onClick={loginAlert}>로그인</button>
      </div>
    </>
  );
}

export default Login;
