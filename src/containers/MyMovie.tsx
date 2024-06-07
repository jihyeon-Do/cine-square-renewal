import React, { useState, useEffect, useRef } from 'react';
import MyMovieList from '../components/MyMovieList';
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

  const fetchMovies = async (url: string, bearerHeader?: any) => {
    setIsLoading(true);
    try {
      const response = await api.get(url, bearerHeader);
      const moviePromises = response.data.list.map(async (v: any) => {
        const movieSimpleInfo = await api.get(
          `/api/movies/${v.movie_id || v}/simple`,
        );

        return typeof v === 'number'
          ? movieSimpleInfo.data.data
          : { ...v, thumbnail: movieSimpleInfo.data.data.thumbnail };
      });
      const movies = await Promise.all(moviePromises);
      setMovieArray((prevMovies) => [...prevMovies, ...movies]);
      setTotalCount(response.data.total_count);
      setPage((prevPage) => prevPage + 1);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  //: 가장먼저 영화 불러오기
  //: page 0 => page 1
  useEffect(() => {
    const fetchUrl =
      listname === 'evaluated'
        ? `/api/user-reports/me/movies/scored?page=1&size=32`
        : `/api/user-reports/me/movies/-/status?page=1&size=32`;

    if (!stopFetch.current) {
      fetchMovies(fetchUrl);
    }
  }, []);

  //: 1 page 부르고 난 후 2 page부터 호출
  useEffect(() => {
    if (page === 1) {
      setIsLoading(false);
      return;
    }
    if (page > 0 && !stopFetch.current) {
      const fetchUrl =
        listname === 'evaluated'
          ? `/api/user-reports/me/movies/scored?page=${page}&size=32`
          : `/api/user-reports/me/movies/-/status?page=${page}&size=32`;

      fetchMovies(fetchUrl, bearer_header);
    }
  }, [page]);

  useEffect(() => {
    //: movieArray의 길이와 totalCount의 길이가 같아지면 fetch 멈추기
    if (movieArray.length === totalCount) {
      setIsLoading(false);
      stopFetch.current = true;
    }
  }, [movieArray, totalCount]);

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
