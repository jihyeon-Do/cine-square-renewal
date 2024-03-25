import React from 'react';
import ReactDOM from 'react-dom';
import { ReactComponent as FullStar1 } from '../images/star-full.svg';
import './MyMovieList.scss';

type Movie = {
  id: number;
  movieCd: string;
  movieNm: string;
  score: number;
  mainImg: string;
};

interface MyMovieListProps {
  movieList: Movie[];
}

function MyMovieList({ movieList }: MyMovieListProps) {
  return (
    <section className="my-choice-movie">
      {<h3>평가한 영화 리스트</h3>}
      <ul>
        {movieList.map((v, i) => (
          <li key={i}>
            <img src={v.mainImg} alt="영화 메인 포스터" />
            <p>{v.movieNm}</p>
            <p>
              <FullStar1 />
              {v.score}점으로 평가함
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default MyMovieList;
