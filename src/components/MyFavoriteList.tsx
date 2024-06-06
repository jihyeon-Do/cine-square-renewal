import React from 'react';
import './myFavoriteList.scss';
import { ReactComponent as FullStar } from '../images/star-full1.svg';
import like_thumb from '../images/like_thumb.png';
import commentIcon from '../images/comment_icon.png';
import personProfileImg from '../images/profile_picture.png';
import APIService from '../service/APIService';
import axios from 'axios';

type Review = {
  comment_id: number;
  content: string;
  like: number;
  movie_id: number;
  nickname: string;
  reply_count: number;
  score: number;
  user_id: number;
  open_date: string;
  title: string;
  thumbnail: string;
  isLike: boolean;
};

interface MyMovieListProps {
  data: Review[];
  pageName: string;
  func: any;
}

function MyFavotieList({ data, pageName, func }: MyMovieListProps) {
  const LOCALAPI = APIService.LOCALAPI;
  const access_token = sessionStorage.getItem('token');
  const bearer_header = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  //: 좋아요 토글
  const like = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number,
    likeStatus: boolean,
    movieId: number,
  ) => {
    try {
      if (likeStatus) {
        await axios.delete(
          `${LOCALAPI}/api/user-reports/-/movies/${movieId}/comments/${id}/like`,
          bearer_header,
        );
      } else {
        await axios.post(
          `${LOCALAPI}/api/user-reports/-/movies/${movieId}/comments/${id}/like`,
          {},
          bearer_header,
        );
      }
      const toggleLike = data.map((v, i) => {
        if (v.comment_id === id) {
          return { ...v, isLike: !v.isLike };
        } else {
          return v;
        }
      });
      func(toggleLike);
    } catch (error) {
      console.log(error);
    }
  };

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
          {data.length !== 0 ? (
            data.map((v, i) => (
              <li key={i}>
                <div className="writer">
                  <div className="profile">
                    <img src={personProfileImg} alt="" />
                    {v.nickname}
                  </div>
                  {v.score ? (
                    <span>
                      <FullStar />
                      {v.score}
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="content">
                  <img src={v.thumbnail} alt="" />
                  <div>
                    <p>{v.title}</p>
                    <span>영화 {v.open_date}</span>
                    <p>{v.content}</p>
                  </div>
                </div>
                <div className="like-recomment">
                  <span>
                    <img src={like_thumb} alt="좋아요" />
                    {v.like}
                  </span>
                  <span>
                    <img src={commentIcon} alt="코멘트" />
                    {v.reply_count}
                  </span>
                </div>
                <div className="like-btn">
                  <button
                    className={`${v.isLike && 'active'}`}
                    onClick={(e) => like(e, v.comment_id, v.isLike, v.movie_id)}
                  >
                    {v.isLike ? '좋아요 취소' : '좋아요'}
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="no-comment">코멘트가 없습니다.</p>
          )}
        </ul>
      ) : (
        <ul className="favorite-person">
          {data.map((v, i) => (
            <li key={i}>
              <img src={personProfileImg} alt="인물 프로필 기본이미지" />
              <p>{v.nickname}</p>
              {/* <p>{v.role}</p> */}
              {/* <p>{v.work}</p> */}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default MyFavotieList;
