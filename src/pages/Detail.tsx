import React, { useState, useRef, useCallback, useEffect } from 'react';
import FooterTemplate from '../components/FooterTemplate';
import HeaderTemplate from '../components/HeaderTemplate';
import './detail.scss';
import { ReactComponent as EmptyStar } from '../images/star-empty1.svg';
import { ReactComponent as HalfStar } from '../images/star-half1.svg';
import { ReactComponent as FullStar } from '../images/star-full1.svg';
import { ReactComponent as FullStar1 } from '../images/star-full.svg';
import { ReactComponent as Reset } from '../images/reset.svg';
import BookmarkEmpty from '../images/unlike.png';
import BookmarkFull from '../images/like.png';
import unlike_thumb from '../images/unlike_thumb.png';
import like_thumb from '../images/like_thumb.png';
import noImg from '../images/no-images.png';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import APIService from '../service/APIService';

// const AWSAPI = APIService.AWSAPI;
const LOCALAPI = APIService.LOCALAPI;
// const PROXY = APIService.PROXY;

type movieDetailInfoType = {
  movie_title: string;
  open_date: number;
  genres: string;
  nations: string;
  running_time: string;
  mainImg: string;
  score: number;
  actors: string[];
  content: string;
  movie_title_en: string;
  production_year?: number;
};

type commentsList = {
  content: string;
  score: number;
  comment: string;
  nickname: string;
  like: number;
  comment_id: number;
  reply_count: number;
  user_id: number;
}[];

const MAX_SCORE = 5;

export default function Detail() {
  const [score, setScore] = useState(0);
  const [displayScore, setDisplayScore] = useState(score);
  const [bookmark, setBookmark] = useState(false);
  const [value, setvalue] = useState('');
  const [comments, setComments] = useState<commentsList>([]);
  const [seeMore, setSeeMore] = useState(false);
  const [movieInfo, setMovieInfo] = useState<movieDetailInfoType | null>(null);
  const [isLike, setIsLike] = useState(false);
  const formtag = useRef(null);

  const { movieId } = useParams();

  //   const token = useSelector((state) => state.auth.token);
  //   const account = useSelector((state) => state.auth.account);
  //   const userName = useSelector((state) => state.auth.userName);

  const requiredLogin = () => {
    alert('로그인 후 이용해 주세요');
    // dispatch(push('/signin'));
  };

  //: 영화 상세 정보, 유저가 평가한 점수, 유저 보고싶어요 상태
  useEffect(() => {
    async function userMovieInfo() {
      try {
        const statusResponse = await axios.get(
          `${LOCALAPI}/api/user-reports/status/movies/${movieId}/users/${6}`,
        );
        setBookmark(statusResponse.data.result === 0 ? false : true);
        const scoreResponse = await axios.get(
          `${LOCALAPI}/api/user-reports/score/movies/${movieId}/users/${6}`,
        );
        setDisplayScore(scoreResponse.data.result);
        setScore(scoreResponse.data.result);
        const commentScore = await axios.get(
          `${LOCALAPI}/api/movie-reports/summary/movies/${movieId}`,
        );
        setComments(commentScore.data.list);
      } catch (error) {
        console.log(error);
      }
    }
    userMovieInfo();
  }, []);

  useEffect(() => {
    async function getMovieInfo() {
      try {
        const response = await axios.get(`${LOCALAPI}/api/movies/${movieId}`);
        //: actor가 null이 아닐 때
        if (response.data.data.actors) {
          const actor = response.data.data.actors.split(',');
          //: directors도 null이 아닌지 체크
          if (response.data.data.directors) {
            const directors = response.data.data.directors.split(',');
            const copyMovieDetail = {
              ...response.data.data,
              actors: [...actor, ...directors],
            };
            setMovieInfo(copyMovieDetail);
          } else {
            //: actor는 null이 아니고 directors는 null일때
            const copyMovieDetail = { ...response.data.data, actors: actor };
            setMovieInfo(copyMovieDetail);
          }
        } else {
          //: actor가 null인 상황
          if (response.data.data.directors) {
            //: directors는 null인지 체크
            const directors = response.data.data.directors.split(',');
            const copyMovieDetail = {
              ...response.data.data,
              actors: directors,
            };
            setMovieInfo(copyMovieDetail);
          } else {
            setMovieInfo(response.data.data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    getMovieInfo();
  }, [movieId]);

  //   useEffect(() => {
  //     async function getMovieGrade() {
  //       try {
  //         const response = await axios({
  //           method: 'POST',
  //           url: `${PROXY}/user/gradeAndReview`,
  //           data: {
  //             cineToken: token,
  //             movieCd: movieCd,
  //           },
  //         });
  //         setScore(response.data.result.grade);
  //         setDisplayScore(response.data.result.grade);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //     getMovieGrade();
  //   }, [token, movieCd]);

  const handleChange = (v: any) => {
    // if (token === null) {
    //   requiredLogin();
    // } else {
    //   if (score === 0 && displayScore === 0) return;
    //   sendScore(v);
    //   setScore(v);
    // }
    if (score === 0 && displayScore === 0) return;
    sendScore(v);
    setScore(v);
  };

  const sendScore = async function (v: number) {
    // if (account === null) return;
    try {
      const response = await axios({
        method: 'POST',
        url: `${LOCALAPI}/api/user-reports/score`,
        // url: `${LOCALAPI}/user/selectMovieGrade`,
        data: {
          user_id: 6,
          movie_id: movieId,
          score: v,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const calculateScore = (e: {
    currentTarget: { getBoundingClientRect: () => { width: any; left: any } };
    clientX: number;
  }) => {
    const { width, left } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const scale = width / MAX_SCORE / 2;
    return (Math.floor(x / scale) + 1) / 2;
  };

  const handleMouseMove = useCallback((e: any) => {
    setDisplayScore(calculateScore(e));
  }, []);

  const handleBookmark = async () => {
    // if (token === null) {
    //   requiredLogin();
    // } else {
    //   setBookmark(!bookmark);
    // }
    // setBookmark(!bookmark);
    const response = await axios.post(`${LOCALAPI}/api/user-reports/status`, {
      user_id: 6,
      movie_id: movieId,
      status: bookmark === false ? 1 : 0,
    });
    if (response.data.result) {
      setBookmark(!bookmark);
    }
  };

  function addComment(e: any) {
    setvalue(e.target.value);
  }

  async function like(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    commentId: number,
  ) {
    let copyComments: any[] = [];
    comments.map((v, i) => {
      if (v.comment_id === commentId) {
        copyComments = [...copyComments, { ...v, like: v.like === 0 ? 1 : 0 }];
      } else {
        copyComments = [...copyComments, v];
      }
    });
    console.log(copyComments);
    // try {
    //   const response = await axios.post(
    //     `${LOCALAPI}/api/user-reports/like-comment`,
    //     {
    //       user_id: 6,
    //       comment_id: commentId,
    //     },
    //   );
    //   if (response.data.result) {
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }

  async function handleAddComment() {
    // if (token === null) {
    //   requiredLogin();
    // } else {
    //   setComments([
    //     ...comments,
    //     {
    //       id: maxId(),
    //       nickName: userName,
    //       comment: value,
    //       dates: commentDate(),
    //     },
    //   ]);
    //   setvalue('');
    // }
    try {
      const response = await axios.post(
        `${LOCALAPI}/api/movie-reports/comment`,
        {
          content: value,
          user_id: 5,
          movie_id: movieId,
        },
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  function enterPressComment(e: { key: string; preventDefault: () => void }) {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    handleAddComment();
  }

  return (
    <>
      <HeaderTemplate />
      <main className="detail-main">
        <h2 className="readable-hidden">영화상세정보</h2>
        <div className="poster-wrapper">
          <div className="poster-box">
            {/* <div className="poster-box-1"></div> */}
            <div className="poster-box-2"></div>
            {/* <div className="poster-box-3"></div> */}
          </div>
        </div>
        {movieInfo && (
          <section>
            <div className="movie-info">
              <div className="movie-info1">
                <img src={`${noImg}`} alt={`${movieInfo.movie_title}포스터`} />
                <div className="box2">
                  <p className="movie-title">
                    {movieInfo.movie_title} {`(${movieInfo.movie_title_en})`}
                    <button className="bookmark" onClick={handleBookmark}>
                      <Bookmark bookmark={bookmark} />
                      <span>보고싶어요</span>
                    </button>
                  </p>
                  <p className="movie-sub-info">
                    {movieInfo.open_date || movieInfo.production_year}
                    <span>{movieInfo.genres}</span>
                    <span>{movieInfo.nations}</span>
                  </p>
                  <p className="movie-sub-info">{movieInfo.running_time}분</p>
                  <p className="movie-sub-info2">
                    <span>
                      <FullStar1 />
                    </span>
                    평점{' '}
                    {movieInfo.score === null
                      ? '(아직 평가되지 않았습니다.)'
                      : Number(movieInfo.score).toFixed(1)}
                  </p>
                  {/* 만약 평점 {score} 부분을 실시간으로 보고 싶지 않다면, {movieInfo.grade}로 변경하면 된다. */}
                  <div className="rating">
                    <section>
                      <div
                        className="stars"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => setDisplayScore(score)}
                        onClick={() => handleChange(displayScore)}
                      >
                        {[...Array(MAX_SCORE)].map((_, i) => (
                          <Star key={i} score={displayScore} i={i} />
                        ))}
                      </div>
                      <Reset
                        className="reset"
                        onClick={() => {
                          handleChange(0);
                          setDisplayScore(0);
                        }}
                      ></Reset>
                    </section>
                    <span>{displayScore} 점으로 평가하셨습니다.</span>
                  </div>
                </div>
              </div>
              <div className="movie-info2">
                <h3>소개</h3>
                <div className="movie-sub-info3">
                  <dl>
                    <div>
                      {/* <dd>{movieInfo.content}</dd> */}
                      <dd>준비중입니다.</dd>
                    </div>
                  </dl>
                </div>
                {/* <button onClick={() => setSeeMore(true)}>더보기</button> */}
              </div>

              <div className="movie-info3">
                <h3>출연/제작</h3>
                <ul>
                  {movieInfo.actors ? (
                    movieInfo.actors.map((character, index) => (
                      <li key={index}>
                        <img
                          // src={`${character.characterImg}`}
                          // alt={`${character.realNm}`}
                          src={'../images/profile_picture.png'}
                        />
                        <p>{character}</p>
                        {/* <p>{character.movieRoll}</p>
                      <p>{character.characterNm}</p> */}
                      </li>
                    ))
                  ) : (
                    <p>준비중입니다</p>
                  )}
                </ul>
              </div>
              <div className="movie-info4">
                <h3>코멘트</h3>
                <form action="/detail" ref={formtag}>
                  <fieldset>
                    <legend className="readable-hidden">코멘트 작성</legend>
                    <input
                      type="text"
                      value={value}
                      placeholder="기대평, 관람평을 자유롭게 작성해주세요!"
                      onChange={addComment}
                      onKeyDown={enterPressComment}
                    />
                    <button type="button" onClick={handleAddComment}>
                      관람평 작성
                    </button>
                  </fieldset>
                </form>
                <ul className="comments">
                  {comments.length !== 0 ? (
                    comments.map((v, i) => (
                      <li key={i}>
                        <div>
                          <p>
                            <FullStar1 />
                            {v.score}
                          </p>
                          <p>{v.content}</p>
                          <p>
                            <span>
                              <img src={unlike_thumb} alt="좋아요 안한 상태" />
                              {v.like}
                            </span>
                            <button onClick={(e) => like(e, v.comment_id)}>
                              좋아요
                            </button>
                          </p>
                        </div>
                        <span>{v.nickname}</span>
                      </li>
                    ))
                  ) : (
                    <p className="no-comment">코멘트가 없습니다.</p>
                  )}
                </ul>
                <button className="add-content">더보기</button>
              </div>
            </div>
          </section>
        )}
      </main>
      <FooterTemplate />
    </>
  );
}

const Star = ({ score, i }: any) => {
  if (score > i) {
    if (score - i === 0.5) {
      return <HalfStar />;
    } else {
      return <FullStar />;
    }
  } else {
    return <EmptyStar />;
  }
};

const Bookmark = ({ bookmark }: any) => {
  if (bookmark) {
    return <img src={BookmarkFull} alt="" />;
  } else {
    return <img src={BookmarkEmpty} alt="" />;
  }
};
