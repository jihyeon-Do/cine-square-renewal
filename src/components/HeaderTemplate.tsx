import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './headerTemplate.scss';
import mainLogo from '../images/main_logo.svg';

function HeaderTemplate() {
  const [value, setValue] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [isSearch, setIsSearch] = useState(false);
  const searchInput = useRef<HTMLInputElement>(null);
  const searchClickButton = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const { keyword } = useParams();

  // useEffect(() => {
  //   if (urlParameter === `/search/${keyword}`) {
  //     setValue(keyword);
  //   }
  // }, [urlParameter, keyword]);

  useEffect(() => {
    if (keyword) {
      setValue(keyword);
    }
  }, [keyword]);

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    } else {
      setToken(null);
    }
  }, []);

  function logOut() {
    if (confirm('로그아웃 하시겠습니까?')) {
      sessionStorage.removeItem('token');
      alert('로그아웃 되었습니다.');
      navigate('/');
      location.reload();
    } else {
      return;
    }
    // TokenService.delete();
    // AccountService.deleteAccount();
    // AccountService.deleteUserName();
    // logoutUser()
  }
  const logoutUser = useCallback(() => {
    // dispatch(startLogoutActionCreator());
    // dispatch(push('/'));
  }, []);

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
      (e as React.KeyboardEvent<HTMLInputElement>).key === 'Enter' ||
      (e.target === searchClickButton.current && e.type === 'click')
    ) {
      // getValue();
      navigate(`/search/${value}`);
    }
  }

  function mHandleSearch(
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    type: string,
  ) {
    if (type === 'click') {
      setIsSearch(!isSearch);
    }
    if (value === '') return;
    if (
      (e as React.KeyboardEvent<HTMLInputElement>).key === 'Enter' ||
      (e.target === searchClickButton.current && e.type === 'click')
    ) {
      if (type === 'enter') {
        setIsSearch(false);
      }
      navigate(`/search/${value}`);
    }
  }

  return (
    <header className="header-container">
      <div className={`header-wrapper pc`}>
        <h1
          className="header"
          //   onClick={() => {
          //     dispatch(push('/'));
          //   }}
          onClick={() => navigate('/')}
        >
          <img src="../images/main_logo.svg" alt="main_logo" />
        </h1>
        <div className="right-content">
          <div
            className={`input-box ${isSearch ? 'active' : ''}`}
            role="search"
          >
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
            {token && (
              <div>
                <Link to="/evaluation">평가하기</Link>
                <button onClick={() => navigate('/profile')}>내정보</button>
                <button onClick={logOut}>로그아웃</button>
              </div>
            )}
            {!token && (
              <div>
                <Link to="/signin">로그인</Link>
                <Link to="/signup">회원가입</Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={`header-wrapper mobile`}>
        <h1
          className={`header ${isSearch ? 'displayNone' : ''}`}
          //   onClick={() => {
          //     dispatch(push('/'));
          //   }}
          onClick={() => navigate('/')}
        >
          <img src={mainLogo} alt="main_logo" />
        </h1>
        <div className={`right-content ${isSearch ? 'active' : ''}`}>
          <div
            className={`input-box ${isSearch ? 'active' : ''}`}
            role="search"
          >
            <input
              ref={searchInput}
              onKeyUp={(e) => mHandleSearch(e, 'enter')}
              type="text"
              value={value}
              onChange={search}
              placeholder="검색"
              aria-label="영화검색창"
              className={isSearch ? 'active' : ''}
            />
            <button
              ref={searchClickButton}
              className="search-button"
              onClick={(e) => mHandleSearch(e, 'click')}
            >
              검색버튼
            </button>
          </div>
          <div className={`my-profile-btn ${isSearch ? 'displayNone' : ''}`}>
            {token && (
              <div className="status-logged">
                <Link to="/evaluation">평가하기</Link>
                <button onClick={() => navigate('/profile')}>내정보</button>
                <button onClick={logOut}>로그아웃</button>
              </div>
            )}
            {!token && (
              <div>
                <Link to="/signin">로그인</Link>
                <Link to="/signup">회원가입</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderTemplate;
