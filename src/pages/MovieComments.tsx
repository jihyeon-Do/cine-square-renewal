import React, { useEffect, useState } from 'react';
import HeaderTemplate from '../components/HeaderTemplate';
import FooterTemplate from '../components/FooterTemplate';
import backHistory from '../images/arrow_back.png';
import { ReactComponent as FullStar } from '../images/star-full1.svg';
import personProfileImg from '../images/profile_picture.png';
import like_thumb from '../images/like_thumb.png';
import commentIcon from '../images/comment_icon.png';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './movieComments.scss';

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

function MovieComments() {
  const [movieComments, setMovieComments] = useState<Review[]>([]);
  const location = useLocation();
  const LOCALAPI = APIService.LOCALAPI;
  const access_token = sessionStorage.getItem('token');
  const bearer_header = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  const { movieId } = useParams();

  const navigate = useNavigate();

  const requiredLogin = () => {
    alert('로그인 후 이용해 주세요');
    navigate('/signin');
    // dispatch(push('/signin'));
  };

  useEffect(() => {
    const getMovieComments = async () => {
      const response = await axios.get(
        `${LOCALAPI}/api/movie-reports/summary/movies/${movieId}?page=${1}&size=${10}`,
      );
      let copyMovieComments: any = [];
      response.data.list.map(async (v: any) => {
        const detailMovieInfo = await axios.get(
          `${LOCALAPI}/api/movies/${v.movie_id}`,
        );
        copyMovieComments = [
          ...copyMovieComments,
          {
            ...v,
            open_date: detailMovieInfo.data.data.open_date,
            title: detailMovieInfo.data.data.title,
            thumbnail: detailMovieInfo.data.data.thumbnail,
            isLike: false,
          },
        ];
        if (access_token) {
          const userLikeCommentsList = await axios.get(
            `${LOCALAPI}/api/user-reports/movies/${movieId}/like-comments`,
            bearer_header,
          );
          if (userLikeCommentsList.data.list.length) {
            let copyComment: any = [];
            copyMovieComments.map((v: any) => {
              for (let i = 0; i < userLikeCommentsList.data.list.length; i++) {
                if (
                  v.comment_id === userLikeCommentsList.data.list[i].comment_id
                ) {
                  copyComment = [...copyComment, { ...v, isLike: true }];
                  break;
                } else if (i === userLikeCommentsList.data.list.length - 1) {
                  copyComment = [...copyComment, v];
                }
              }
            });
            setMovieComments(copyComment);
          } else {
            setMovieComments(copyMovieComments);
          }
        } else {
          setMovieComments(copyMovieComments);
        }
      });
    };
    getMovieComments();
  }, []);

  async function like(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    commentId: number,
    isLike?: boolean,
  ) {
    if (access_token) {
      //: like 가 false 면 like를 해야함
      if (!isLike) {
        try {
          const response = await axios.post(
            `${LOCALAPI}/api/user-reports/movies/${movieId}/like-comments/${commentId}`,
            {},
            bearer_header,
          );
          if (response.status === 200) {
            let copyComments: any[] = [];
            movieComments.map((v, i) => {
              if (v.comment_id === commentId) {
                copyComments = [
                  ...copyComments,
                  { ...v, like: v.like + 1, isLike: true },
                ];
              } else {
                copyComments = [...copyComments, v];
              }
            });
            setMovieComments(copyComments);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        //: like 취소하기
        try {
          const response = await axios.delete(
            `${LOCALAPI}/api/user-reports/movies/${movieId}/like-comments/${commentId}`,
            bearer_header,
          );
          if (response.status === 200) {
            let copyComments: any[] = [];
            movieComments.map((v, i) => {
              if (v.comment_id === commentId) {
                copyComments = [
                  ...copyComments,
                  { ...v, like: v.like - 1, isLike: false },
                ];
              } else {
                copyComments = [...copyComments, v];
              }
            });
            setMovieComments(copyComments);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      requiredLogin();
    }
  }

  return (
    <>
      <HeaderTemplate />
      <main>
        <h2 className="a11y-hidden">영화별 코멘트 리스트</h2>
        {/* <button className="back">
          <img src={backHistory} alt="뒤로가기" />
        </button> */}
        <section className="movie-comments-list">
          <ul>
            {movieComments.length !== 0 ? (
              movieComments.map((v, i) => (
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
                      onClick={(e) => {
                        like(e, v.comment_id, v.isLike);
                      }}
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
        </section>
      </main>
      <FooterTemplate />
    </>
  );
}

export default MovieComments;
