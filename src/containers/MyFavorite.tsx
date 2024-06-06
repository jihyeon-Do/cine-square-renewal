import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom';
import MyFavotieList from '../components/MyFavoriteList';
import APIService from '../service/APIService';
import axios from 'axios';

function MyFavorite() {
  const [favoriteReview, setFavoriteReview] = useState([]);
  const location = useLocation();
  const LOCALAPI = APIService.LOCALAPI;
  const access_token = sessionStorage.getItem('token');
  const bearer_header = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  useEffect(() => {
    const getFavoriteReview = async () => {
      const response = await axios.get(
        `${LOCALAPI}/api/user-reports/me/movies/-/like-comments`,
        bearer_header,
      );
      let copyFavoriteReview: any = [];
      response.data.list.map(async (v: any) => {
        const detailMovieInfo = await axios.get(
          `${LOCALAPI}/api/movies/${v.movie_id}`,
        );
        copyFavoriteReview = [
          ...copyFavoriteReview,
          {
            ...v,
            open_date: detailMovieInfo.data.data.open_date,
            title: detailMovieInfo.data.data.title,
            thumbnail: detailMovieInfo.data.data.thumbnail,
            isLike: true,
          },
        ];
        setFavoriteReview(copyFavoriteReview);
      });
      // setFavoriteReview(response.data.list);
    };
    getFavoriteReview();
  }, []);

  const review: any = [
    // {
    //   nickname: 'wlgus_57',
    //   score: 4.5,
    //   comment:
    //     '테스트입니다.테스트입니다.테스트입니다.테스트입니다.테스트입니다',
    //   like: 2665,
    //   myLikes: 1,
    //   date: '2024-03-15',
    //   movieInfo: {
    //     title: '파묘',
    //     date: '2024-03-01',
    //   },
    // },
    // {
    //   nickname: 'wlgus_57',
    //   score: 4.5,
    //   comment:
    //     '테스트입니다.테스트입니다.테스트입니다.테스트입니다.테스트입니다',
    //   like: 2665,
    //   myLikes: 1,
    //   date: '2024-03-15',
    //   movieInfo: {
    //     title: '파묘',
    //     date: '2024-03-01',
    //   },
    // },
    // {
    //   nickname: 'wlgus_57',
    //   score: 4.5,
    //   comment:
    //     '테스트입니다.테스트입니다.테스트입니다.테스트입니다.테스트입니다',
    //   like: 2665,
    //   myLikes: 1,
    //   date: '2024-03-15',
    //   movieInfo: {
    //     title: '파묘',
    //     date: '2024-03-01',
    //   },
    // },
    // {
    //   nickname: 'wlgus_57',
    //   score: 4.5,
    //   comment:
    //     '테스트입니다.테스트입니다.테스트입니다.테스트입니다.테스트입니다',
    //   like: 2665,
    //   myLikes: 1,
    //   date: '2024-03-15',
    //   movieInfo: {
    //     title: '파묘',
    //     date: '2024-03-01',
    //   },
    // },
    // {
    //   nickname: 'wlgus_57',
    //   score: 4.5,
    //   comment:
    //     '테스트입니다.테스트입니다.테스트입니다.테스트입니다.테스트입니다',
    //   like: 2665,
    //   myLikes: 1,
    //   date: '2024-03-15',
    //   movieInfo: {
    //     title: '파묘',
    //     date: '2024-03-01',
    //   },
    // },
  ];

  // const favoriteReview = [
  //   {
  //     nickname: 'wlgus_57',
  //     score: 2.5,
  //     comment:
  //       '리뷰 테스트 입니다!!!!!리뷰 테스트 입니다!!!!!리뷰 테스트 입니다!!!!!리뷰 테스트 입니다!!!!!리뷰 테스트 입니다!!!!!',
  //     like: 1099,
  //     myLikes: 1,
  //     date: '2024-03-15',
  //     movieInfo: {
  //       title: '고질라',
  //       date: '2024-03-03',
  //     },
  //   },
  //   {
  //     nickname: 'wlgus_57',
  //     score: 2.5,
  //     comment:
  //       '리뷰 테스트 입니다!!!!!리뷰 테스트 입니다!!!!!리뷰 테스트 입니다!!!!!리뷰 테스트 입니다!!!!!리뷰 테스트 입니다!!!!!',
  //     like: 1099,
  //     myLikes: 1,
  //     date: '2024-03-15',
  //     movieInfo: {
  //       title: '고질라',
  //       date: '2024-03-03',
  //     },
  //   },
  // ];

  const favoritePerson: any = [
    // {
    //   name: '도경수',
    //   role: '배우',
    //   work: '카트',
    // },
    // {
    //   name: '도경수',
    //   role: '배우',
    //   work: '카트',
    // },
    // {
    //   name: '도경수',
    //   role: '배우',
    //   work: '카트',
    // },
    // {
    //   name: '도경수',
    //   role: '배우',
    //   work: '카트',
    // },
    // {
    //   name: '도경수',
    //   role: '배우',
    //   work: '카트',
    // },
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
      func={
        location.pathname === '/review'
          ? review
          : location.pathname === '/favorite/review'
            ? setFavoriteReview
            : favoritePerson
      }
    />
  );
}

export default MyFavorite;
