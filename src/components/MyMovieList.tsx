import React from 'react';
import ReactDOM from 'react-dom';
import { ReactComponent as FullStar1 } from '../images/star-full.svg';
import './MyMovieList.scss';
import { useNavigate } from 'react-router-dom';
import Test from '../pages/Test';
import LoadingSpinner from './LoadingSpinner';

type Movie = {
  movie_id: number;
  score: number;
  title: string;
  thumbnail: string;
};

interface MyMovieListProps {
  movieArray: Movie[];
  listname: string;
  setPage: any;
  isLoading: boolean;
  page: number;
}

function MyMovieList({
  movieArray,
  listname,
  setPage,
  isLoading,
  page,
}: MyMovieListProps) {
  const navigate = useNavigate();

  function goDetailPage(movieId: number) {
    navigate(`/detail/${movieId}`);
  }

  return (
    <section className="my-choice-movie">
      <h3>
        {listname === 'evaluated' ? '평가한 영화 리스트' : '보고싶은 영화'}
      </h3>
      <ul>
        {movieArray.map((v, i) => (
          <li key={i} onClick={() => goDetailPage(v.movie_id)}>
            <div className="thumbnail-wrapper">
              <div className="wrapper">
                <img src={v.thumbnail} alt="영화 메인 포스터" />
              </div>
            </div>
            <p>{v.title}</p>
            {v.score ? (
              <p>
                <FullStar1 />
                {v.score}점으로 평가함
              </p>
            ) : (
              <></>
            )}
          </li>
        ))}
      </ul>
      {page > 0 && !isLoading && <Test setPage={setPage} />}
      {isLoading && <LoadingSpinner />}
    </section>
  );
}

export default MyMovieList;
