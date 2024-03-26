import React from 'react';
import ReactDOM from 'react-dom';
import './myFavoriteList.scss';
import { ReactComponent as FullStar1 } from '../images/star-full.svg';
import unlike_thumb from '../images/unlike_thumb.png';
import { useLocation } from 'react-router-dom';
import personProfileImg from '../images/profile_picture.png';

type Review = {
  nickname?: string;
  score?: number;
  comment?: string;
  like?: number;
  myLikes?: number;
  date?: string;
  movieInfo?: {
    title: string;
    date: string;
  };
  name?: string;
  role?: string;
  work?: string;
};

interface MyMovieListProps {
  data: Review[];
  pageName: string;
}

function MyFavotieList({ data, pageName }: MyMovieListProps) {
  return (
    <section className="my-choice">
      {
        <h3>
          {pageName === 'review'
            ? '나의 코멘트'
            : pageName === 'favoriteReview'
              ? '좋아하는 코멘트'
              : pageName === 'favoritePerson'
                ? '좋아하는 인물'
                : ''}
        </h3>
      }
      {pageName === 'review' || pageName === 'favoriteReview' ? (
        <ul>
          {data.map((v, i) => (
            <li key={i}>
              <p>
                <div>
                  {v.movieInfo?.title}
                  <span>영화</span>
                  <span>{v.movieInfo?.date}</span>
                </div>
                <div>
                  <FullStar1 />
                  {v.score}점
                </div>
              </p>
              <p>{v.comment}</p>
              <p>
                {v.nickname?.slice(0, 4) + '****'} <span>{v.date}</span>
              </p>
              <p>
                <button>
                  <img src={unlike_thumb} alt="" />
                  <span>{v.like}</span>
                </button>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="favorite-person">
          {data.map((v, i) => (
            <li key={i}>
              <img src={personProfileImg} alt="인물 프로필 기본이미지" />
              <p>{v.name}</p>
              <p>{v.role}</p>
              <p>{v.work}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default MyFavotieList;
