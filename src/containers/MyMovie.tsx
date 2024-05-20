import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ReactComponent as FullStar1 } from '../images/star-full.svg';
import MyMovieList from '../components/MyMovieList';
import axios from 'axios';
import APIService from '../service/APIService';
import { api } from '../service/AxiosInstance';

interface Listname {
  listname: string;
}

type Movie = {
  movie_id: number;
  score: number;
  title: string;
  thumbnail: string;
};

function MyMovie({ listname }: Listname) {
  const [movieArray, setMovieArray] = useState<Movie[]>([]);

  const LOCALAPI = APIService.LOCALAPI;
  const access_token = sessionStorage.getItem('token');
  const bearer_header = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

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

  const movieListArray: any = [];

  useEffect(() => {
    const getMovie = async () => {
      if (listname === 'evaluated') {
        try {
          const response = await api.get(`/api/user-reports/movies/scored`);
          const evaluatedPromise = response.data.list.map(async (v: any) => {
            const movieSimpleInfo = await api.get(
              `/api/movies/${v.movie_id}/simple`,
            );
            return { ...v, thumbnail: movieSimpleInfo.data.data.thumbnail };
          });
          const evaluatedMovieList = await Promise.all(evaluatedPromise);
          console.log(evaluatedMovieList);
          setMovieArray(evaluatedMovieList);
        } catch (error) {
          console.log(error);
        }
      } else {
        setMovieArray([]);
      }
    };
    getMovie();
  }, []);

  return (
    <>
      <MyMovieList movieArray={movieArray} listname={listname} />
    </>
  );
}

export default MyMovie;
