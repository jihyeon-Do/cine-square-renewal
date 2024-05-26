import React, { useState, useEffect, useCallback } from 'react';
import HeaderTemplate from '../components/HeaderTemplate';
import FooterTemplate from '../components/FooterTemplate';
import { Link, useLocation } from 'react-router-dom';
// import './mychoice.scss';
import backHistory from '../images/arrow_back.png';
import './evaluation.scss';

import axios from 'axios';
import APIService from '../service/APIService';
import MovieRating from '../components/MovieRating';
import Test from './Test';

type RandomMovies = {
  movie_id: number;
  nation: string;
  production_year: number;
  thumbnail: string;
  title: string;
};

export default function Evaluation() {
  const MAX_SCORE = 5;
  const [evaluatedMovieCount, setEvaluatedMovieCount] = useState(0);
  const [randomMovies, setRandomMovies] = useState<RandomMovies[]>([]);
  const [page, setPage] = useState(0);
  const location = useLocation();

  const LOCALAPI = APIService.LOCALAPI;
  const access_token = sessionStorage.getItem('token');
  const bearer_header = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  //: 랜덤 영화 가져오기
  useEffect(() => {
    const getRandomMovie = async () => {
      const response = await axios.get(
        `${LOCALAPI}/api/movies/reports`,
        bearer_header,
      );
      setRandomMovies(response.data.list);
      if (page === 0) {
        setPage(1);
      }
    };
    getRandomMovie();
  }, []);

  useEffect(() => {
    const getEvaluatedMovies = async () => {
      const response = await axios.get(
        `${LOCALAPI}/api/user-reports/me/movies/scored-counts`,
        bearer_header,
      );
      setEvaluatedMovieCount(response.data.data);
    };
    getEvaluatedMovies();
  }, []);

  console.log(page);

  return (
    <>
      <HeaderTemplate />
      <main className="evaluation-main">
        <h2 className="a11y-hidden">평가하기</h2>
        <button className="back">
          <img src={backHistory} alt="뒤로가기" />
        </button>
        <section className="evalutaion">
          <div>
            <p className="count">{evaluatedMovieCount}</p>
            <p className="aside">내가 본 영화들을 평가해볼까요?</p>
          </div>
          <ul>
            {randomMovies.map((v: RandomMovies, i: number) => (
              <li key={v.movie_id}>
                <MovieRating
                  randomMovies={randomMovies}
                  MAX_SCORE={MAX_SCORE}
                  v={v}
                  movieId={v.movie_id}
                />
              </li>
            ))}
          </ul>
          {page > 0 && <Test setPage={setPage} page={page} />}
        </section>
      </main>

      <FooterTemplate />
    </>
  );
}
