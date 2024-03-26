import React, { useState, useEffect } from 'react';
import HeaderTemplate from '../components/HeaderTemplate';
import FooterTemplate from '../components/FooterTemplate';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './mychoice.scss';
import MyMovie from '../containers/MyMovie';
import backHistory from '../images/arrow_back.png';
import MyFavorite from '../containers/MyFavorite';

export default function MyChoice() {
  const location = useLocation();
  //! pathname에서 어떤 리스트인지 이름 가져와서 페이지 제목 정하기

  return (
    <>
      <HeaderTemplate />
      <main>
        <h2 className="a11y-hidden">listname에 따라 제목이 달라질거다</h2>
        <button className="back">
          <img src={backHistory} alt="뒤로가기" />
        </button>
        {location.pathname.includes('mychoice') ? <MyMovie /> : <MyFavorite />}
      </main>
      <FooterTemplate />
    </>
  );
}
