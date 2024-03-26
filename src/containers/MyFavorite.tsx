import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom';
import MyFavotieList from '../components/MyFavoriteList';

function MyFavorite() {
  const location = useLocation();

  const review = [
    {
      nickname: 'wlgus_57',
      score: 4.5,
      comment:
        '테스트입니다.테스트입니다.테스트입니다.테스트입니다.테스트입니다',
      like: 2665,
      myLikes: 1,
      date: '2024-03-15',
      movieInfo: {
        title: '파묘',
        date: '2024-03-01',
      },
    },
    {
      nickname: 'wlgus_57',
      score: 4.5,
      comment:
        '테스트입니다.테스트입니다.테스트입니다.테스트입니다.테스트입니다',
      like: 2665,
      myLikes: 1,
      date: '2024-03-15',
      movieInfo: {
        title: '파묘',
        date: '2024-03-01',
      },
    },
    {
      nickname: 'wlgus_57',
      score: 4.5,
      comment:
        '테스트입니다.테스트입니다.테스트입니다.테스트입니다.테스트입니다',
      like: 2665,
      myLikes: 1,
      date: '2024-03-15',
      movieInfo: {
        title: '파묘',
        date: '2024-03-01',
      },
    },
    {
      nickname: 'wlgus_57',
      score: 4.5,
      comment:
        '테스트입니다.테스트입니다.테스트입니다.테스트입니다.테스트입니다',
      like: 2665,
      myLikes: 1,
      date: '2024-03-15',
      movieInfo: {
        title: '파묘',
        date: '2024-03-01',
      },
    },
    {
      nickname: 'wlgus_57',
      score: 4.5,
      comment:
        '테스트입니다.테스트입니다.테스트입니다.테스트입니다.테스트입니다',
      like: 2665,
      myLikes: 1,
      date: '2024-03-15',
      movieInfo: {
        title: '파묘',
        date: '2024-03-01',
      },
    },
  ];

  const favoriteReview = [
    {
      nickname: 'wlgus_57',
      score: 2.5,
      comment:
        '리뷰 테스트 입니다!!!!!리뷰 테스트 입니다!!!!!리뷰 테스트 입니다!!!!!리뷰 테스트 입니다!!!!!리뷰 테스트 입니다!!!!!',
      like: 1099,
      myLikes: 1,
      date: '2024-03-15',
      movieInfo: {
        title: '고질라',
        date: '2024-03-03',
      },
    },
    {
      nickname: 'wlgus_57',
      score: 2.5,
      comment:
        '리뷰 테스트 입니다!!!!!리뷰 테스트 입니다!!!!!리뷰 테스트 입니다!!!!!리뷰 테스트 입니다!!!!!리뷰 테스트 입니다!!!!!',
      like: 1099,
      myLikes: 1,
      date: '2024-03-15',
      movieInfo: {
        title: '고질라',
        date: '2024-03-03',
      },
    },
  ];

  const favoritePerson = [
    {
      name: '도경수',
      role: '배우',
      work: '카트',
    },
    {
      name: '도경수',
      role: '배우',
      work: '카트',
    },
    {
      name: '도경수',
      role: '배우',
      work: '카트',
    },
    {
      name: '도경수',
      role: '배우',
      work: '카트',
    },
    {
      name: '도경수',
      role: '배우',
      work: '카트',
    },
  ];
  return (
    <MyFavotieList
      data={
        location.pathname === '/review'
          ? review
          : location.pathname === '/favorite/review'
            ? favoriteReview
            : favoritePerson
      }
      pageName={
        location.pathname === '/review'
          ? 'review'
          : location.pathname === '/favorite/review'
            ? 'favoriteReview'
            : 'favoritePerson'
      }
    />
  );
}

export default MyFavorite;
