import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ReactComponent as FullStar1 } from '../images/star-full.svg';
import MyMovieList from '../components/MyMovieList';

function MyMovie() {
  const movieList = [
    {
      id: 1,
      movieCd: '203662',
      movieNm: '파묘',
      score: 3.5,
      mainImg: '../images/boxoffice1.jpg',
    },
    {
      id: 2,
      movieCd: '203662',
      movieNm: '파묘',
      score: 3.5,
      mainImg: '../images/boxoffice1.jpg',
    },
    {
      id: 3,
      movieCd: '203662',
      movieNm: '파묘',
      score: 3.5,
      mainImg: '../images/boxoffice1.jpg',
    },
    {
      id: 4,
      movieCd: '203662',
      movieNm: '파묘',
      score: 3.5,
      mainImg: '../images/boxoffice1.jpg',
    },
    {
      id: 4,
      movieCd: '203662',
      movieNm: '파묘',
      score: 3.5,
      mainImg: '../images/boxoffice1.jpg',
    },
    {
      id: 4,
      movieCd: '203662',
      movieNm: '파묘',
      score: 3.5,
      mainImg: '../images/boxoffice1.jpg',
    },
    {
      id: 4,
      movieCd: '203662',
      movieNm: '파묘',
      score: 3.5,
      mainImg: '../images/boxoffice1.jpg',
    },
    {
      id: 4,
      movieCd: '203662',
      movieNm: '파묘',
      score: 3.5,
      mainImg: '../images/boxoffice1.jpg',
    },
    {
      id: 4,
      movieCd: '203662',
      movieNm: '파묘',
      score: 3.5,
      mainImg: '../images/boxoffice1.jpg',
    },
    {
      id: 1,
      movieCd: '203662',
      movieNm: '파묘',
      score: 3.5,
      mainImg: '../images/boxoffice1.jpg',
    },
    {
      id: 2,
      movieCd: '203662',
      movieNm: '파묘',
      score: 3.5,
      mainImg: '../images/boxoffice1.jpg',
    },
    {
      id: 3,
      movieCd: '203662',
      movieNm: '파묘',
      score: 3.5,
      mainImg: '../images/boxoffice1.jpg',
    },
    {
      id: 4,
      movieCd: '203662',
      movieNm: '파묘',
      score: 3.5,
      mainImg: '../images/boxoffice1.jpg',
    },
    {
      id: 4,
      movieCd: '203662',
      movieNm: '파묘',
      score: 3.5,
      mainImg: '../images/boxoffice1.jpg',
    },
    {
      id: 4,
      movieCd: '203662',
      movieNm: '파묘',
      score: 3.5,
      mainImg: '../images/boxoffice1.jpg',
    },
    {
      id: 4,
      movieCd: '203662',
      movieNm: '파묘',
      score: 3.5,
      mainImg: '../images/boxoffice1.jpg',
    },
    {
      id: 4,
      movieCd: '203662',
      movieNm: '파묘',
      score: 3.5,
      mainImg: '../images/boxoffice1.jpg',
    },
    {
      id: 4,
      movieCd: '203662',
      movieNm: '파묘',
      score: 3.5,
      mainImg: '../images/boxoffice1.jpg',
    },
    {
      id: 1,
      movieCd: '203662',
      movieNm: '파묘',
      score: 3.5,
      mainImg: '../images/boxoffice1.jpg',
    },
    {
      id: 2,
      movieCd: '203662',
      movieNm: '파묘',
      score: 3.5,
      mainImg: '../images/boxoffice1.jpg',
    },
    {
      id: 3,
      movieCd: '203662',
      movieNm: '파묘',
      score: 3.5,
      mainImg: '../images/boxoffice1.jpg',
    },
    {
      id: 4,
      movieCd: '203662',
      movieNm: '파묘',
      score: 3.5,
      mainImg: '../images/boxoffice1.jpg',
    },
    {
      id: 4,
      movieCd: '203662',
      movieNm: '파묘',
      score: 3.5,
      mainImg: '../images/boxoffice1.jpg',
    },
    {
      id: 4,
      movieCd: '203662',
      movieNm: '파묘',
      score: 3.5,
      mainImg: '../images/boxoffice1.jpg',
    },
    {
      id: 4,
      movieCd: '203662',
      movieNm: '파묘',
      score: 3.5,
      mainImg: '../images/boxoffice1.jpg',
    },
    {
      id: 4,
      movieCd: '203662',
      movieNm: '파묘',
      score: 3.5,
      mainImg: '../images/boxoffice1.jpg',
    },
    {
      id: 4,
      movieCd: '203662',
      movieNm: '파묘',
      score: 3.5,
      mainImg: '../images/boxoffice1.jpg',
    },
  ];

  return (
    <>
      <MyMovieList movieList={movieList} />
    </>
  );
}

export default MyMovie;
