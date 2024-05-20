import React, { useState, useEffect } from 'react';
import HeaderTemplate from '../components/HeaderTemplate';
import FooterTemplate from '../components/FooterTemplate';
import { Link, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import './mychoice.scss';
import MyMovie from '../containers/MyMovie';
import backHistory from '../images/arrow_back.png';
import MyFavorite from '../containers/MyFavorite';

export default function MyChoice() {
  const location = useLocation();
  const { listname } = useParams<{ listname?: string }>();
  //! pathname에서 어떤 리스트인지 이름 가져와서 페이지 제목 정하기

  return (
    <>
      <HeaderTemplate />
      <main>
        {location.pathname.includes('mychoice') ? (
          <h2 className="a11y-hidden">
            {listname === 'evaluated' ? '평가한 영화' : '보고싶은 영화'}
          </h2>
        ) : (
          <h2 className="a11y-hidden">
            {location.pathname === '/review'
              ? '내가 남긴 리뷰'
              : location.pathname === '/favorite/review'
                ? '좋아하는 코멘트'
                : '좋아하는 인물'}
          </h2>
        )}

        {/* <button className="back">
          <img src={backHistory} alt="뒤로가기" />
        </button> */}
        {location.pathname.includes('mychoice') ? (
          listname && <MyMovie listname={listname} />
        ) : (
          <MyFavorite />
        )}
      </main>
      <FooterTemplate />
    </>
  );
}
