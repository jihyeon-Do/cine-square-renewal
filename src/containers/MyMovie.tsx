import React, { useState, useEffect, useRef } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(null);

  const LOCALAPI = APIService.LOCALAPI;
  const access_token = sessionStorage.getItem('token');
  const bearer_header = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  const stopFetch = useRef(false);

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
        setIsLoading(true);
        try {
          if (page === 0) {
            const response = await api.get(
              `/api/user-reports/me/movies/scored?page=1&size=32`,
            );
            setTotalCount(response.data.total_count);
            const evaluatedPromise = response.data.list.map(async (v: any) => {
              const movieSimpleInfo = await api.get(
                `/api/movies/${v.movie_id}/simple`,
              );
              return { ...v, thumbnail: movieSimpleInfo.data.data.thumbnail };
            });
            const evaluatedMovieList = await Promise.all(evaluatedPromise);
            setMovieArray(evaluatedMovieList);
            setPage(1);
            setIsLoading(false);
          } else if (page === 1) {
            setIsLoading(false);
            return;
          } else {
            const response = await api.get(
              `/api/user-reports/me/movies/scored?page=${page}&size=32`,
            );
            const evaluatedPromise = response.data.list.map(async (v: any) => {
              const movieSimpleInfo = await api.get(
                `/api/movies/${v.movie_id}/simple`,
              );
              return { ...v, thumbnail: movieSimpleInfo.data.data.thumbnail };
            });
            const evaluatedMovieList = await Promise.all(evaluatedPromise);
            setTimeout(() => {
              setMovieArray([...movieArray, ...evaluatedMovieList]);
            }, 1000);
          }
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      } else {
        setMovieArray([]);
      }
    };
    if (!stopFetch.current) {
      getMovie();
    }
  }, [page]);

  useEffect(() => {
    //: movieArray의 길이와 totalCount의 길이가 같아지면 fetch 멈추기
    if (movieArray.length === totalCount) {
      setIsLoading(false);
      stopFetch.current = true;
      return;
    }
  }, [movieArray]);

  return (
    <>
      <MyMovieList
        movieArray={movieArray}
        listname={listname}
        setPage={setPage}
        isLoading={isLoading}
        page={page}
      />
    </>
  );
}

export default MyMovie;
