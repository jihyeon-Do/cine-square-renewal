import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './headerTemplate.scss';

function HeaderTemplate() {
  const [value, setValue] = useState('');
  const searchInput = useRef<HTMLInputElement>(null);
  const searchClickButton = useRef<HTMLButtonElement>(null);

  //   useEffect(() => {
  //     if (urlParameter === `/search/${keyword}`) {
  //       setValue(keyword);
  //     }
  //   }, [urlParameter, keyword])

  const logoutUser = useCallback(() => {
    // dispatch(startLogoutActionCreator());
    // dispatch(push('/'));
  }, []);

  function logOut() {
    // TokenService.delete();
    // AccountService.deleteAccount();
    // AccountService.deleteUserName();
    // logoutUser()
  }

  return (
    <header className="header-container">
      <div className="header-wrapper">
        <h1
          className="header"
          //   onClick={() => {
          //     dispatch(push('/'));
          //   }}
        >
          <img src="../images/test.svg" alt="main_logo" />
        </h1>
        <div className="right-content">
          <div className="input-box" role="search">
            <input
              ref={searchInput}
              onKeyUp={(e) => handleSearch(e)}
              type="text"
              value={value}
              onChange={search}
              placeholder="검색"
              aria-label="영화검색창"
            />
            <button
              ref={searchClickButton}
              className="search-button"
              onClick={(e) => handleSearch(e)}
            >
              검색버튼
            </button>
          </div>
          <div className="my-profile-btn">
            {/* {token && (
              <div>
                <Link to="/evaluate">평가하기</Link>
                <Link to="/profile">내정보</Link>
                <p onClick={logOut}>로그아웃</p>
              </div>
            )} */}
            {/* {!token && ( */}
            <div>
              <Link to="/signin">로그인</Link>
              <Link to="/signup">회원가입</Link>
            </div>
            {/* )} */}
          </div>
        </div>
      </div>
    </header>
  );

  function search(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  async function handleSearch(
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    if (value === '') return;
    if (
      (e.target as HTMLFormElement).key === 'Enter' ||
      e.target === searchClickButton.current
    ) {
      //   getValue();
      //   dispatch(push(`/search/${value}`));
    }
  }
}

export default HeaderTemplate;
