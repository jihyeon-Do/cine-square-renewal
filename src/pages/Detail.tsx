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
};

type commentsList = {
  score: number;
  comment: string;
  nickname: string;
  like: number;
}[];

const MAX_SCORE = 5;

export default function Detail() {
  const commentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();

    const todayDate = year + '.' + month + '.' + date;
    return todayDate;
  };

  const [score, setScore] = useState(0);
  const [displayScore, setDisplayScore] = useState(score);
  const [bookmark, setBookmark] = useState(false);
  const [value, setvalue] = useState('');
  const [comments, setComments] = useState<commentsList>([]);
  const [seeMore, setSeeMore] = useState(false);
  const [movieInfo, setMovieInfo] = useState<movieDetailInfoType | null>(null);
  const { movieId } = useParams();

  //   const token = useSelector((state) => state.auth.token);
  //   const account = useSelector((state) => state.auth.account);
  //   const userName = useSelector((state) => state.auth.userName);

  const formtag = useRef(null);

  const requiredLogin = () => {
    alert('로그인 후 이용해 주세요');
    // dispatch(push('/signin'));
  };

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

  const commentsList = [
    {
      score: 3.5,
      comment:
        '영화룰 반으로 잘라서 평가하면 전반부는 정말 잘 만들었는데 후반부는 실망스럽다 다만 그래서 후반을 어떻게 해야 하냐고 물어본다면 흠 더 나은 방법이 있을까 싶다',
      nickname: 'wlgus_57',
      like: 248,
    },
    {
      score: 3.5,
      comment:
        '영화룰 반으로 잘라서 평가하면 전반부는 정말 잘 만들었는데 후반부는 실망스럽다 다만 그래서 후반을 어떻게 해야 하냐고 물어본다면 흠 더 나은 방법이 있을까 싶다',
      nickname: 'wlgus_57',
      like: 248,
    },
    {
      score: 3.5,
      comment:
        '영화룰 반으로 잘라서 평가하면 전반부는 정말 잘 만들었는데 후반부는 실망스럽다 다만 그래서 후반을 어떻게 해야 하냐고 물어본다면 흠 더 나은 방법이 있을까 싶다',
      nickname: 'wlgus_57',
      like: 248,
    },
    {
      score: 3.5,
      comment:
        '영화룰 반으로 잘라서 평가하면 전반부는 정말 잘 만들었는데 후반부는 실망스럽다 다만 그래서 후반을 어떻게 해야 하냐고 물어본다면 흠 더 나은 방법이 있을까 싶다',
      nickname: 'wlgus_57',
      like: 248,
    },
    {
      score: 3.5,
      comment:
        '영화룰 반으로 잘라서 평가하면 전반부는 정말 잘 만들었는데 후반부는 실망스럽다 다만 그래서 후반을 어떻게 해야 하냐고 물어본다면 흠 더 나은 방법이 있을까 싶다',
      nickname: 'wlgus_57',
      like: 248,
    },
    {
      score: 3.5,
      comment:
        '영화룰 반으로 잘라서 평가하면 전반부는 정말 잘 만들었는데 후반부는 실망스럽다 다만 그래서 후반을 어떻게 해야 하냐고 물어본다면 흠 더 나은 방법이 있을까 싶다 영화룰 반으로 잘라서 평가하면 전반부는 정말 잘 만들었는데 후반부는 실망스럽다 다만 그래서 후반을 어떻게 해야 하냐고 물어본다면 흠 더 나은 방법이 있을까 싶다',
      nickname: 'wlgus_57',
      like: 248,
    },
    {
      score: 3.5,
      comment:
        '영화룰 반으로 잘라서 평가하면 전반부는 정말 잘 만들었는데 후반부는 실망스럽다 다만 그래서 후반을 어떻게 해야 하냐고 물어본다면 흠 더 나은 방법이 있을까 싶다',
      nickname: 'wlgus_57',
      like: 248,
    },
    {
      score: 3.5,
      comment:
        '영화룰 반으로 잘라서 평가하면 전반부는 정말 잘 만들었는데 후반부는 실망스럽다 다만 그래서 후반을 어떻게 해야 하냐고 물어본다면 흠 더 나은 방법이 있을까 싶다',
      nickname: 'wlgus_57',
      like: 248,
    },
    {
      score: 3.5,
      comment:
        '영화룰 반으로 잘라서 평가하면 전반부는 정말 잘 만들었는데 후반부는 실망스럽다 다만 그래서 후반을 어떻게 해야 하냐고 물어본다면 흠 더 나은 방법이 있을까 싶다',
      nickname: 'wlgus_57',
      like: 248,
    },
  ];

  useEffect(() => {
    setComments(commentsList);
    console.log(new Date());
  }, []);

  useEffect(() => {
    async function getMovieInfo() {
      try {
        const response = await axios.get(
          `${LOCALAPI}/api/movies/${movieId}/detail`,
        );
        const actor = response.data.data.actors.split(',');
        const copyMovieDetail = { ...response.data.data, actors: actor };
        setMovieInfo(copyMovieDetail);
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

  const sendScore = async function (v: number) {
    // if (account === null) return;
    try {
      const response = await axios({
        method: 'POST',
        url: `${LOCALAPI}/api/user-reports/score`,
        // url: `${LOCALAPI}/user/selectMovieGrade`,
        data: {
          // account: account,
          // cineToken: token,
          // grade: v,
          // movieCd: movieCd,
          user_id: 6,
          movie_id: movieId,
          score: v,
          created: '2024-04-07T20:35:00.117Z',
          updated: '2024-04-07T20:35:00.117Z',
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const calculateScore = (e: any) => {
    const { width, left } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const scale = width / MAX_SCORE / 2;
    return (Math.floor(x / scale) + 1) / 2;
  };

  const handleMouseMove = useCallback((e: any) => {
    setDisplayScore(calculateScore(e));
  }, []);

  const handleBookmark = () => {
    // if (token === null) {
    //   requiredLogin();
    // } else {
    //   setBookmark(!bookmark);
    // }
  };

  const maxId = () => {
    // let commentsId = comments.map((v) => v.id);
    // return Math.max(0, ...commentsId) + 1;
  };

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
                    {movieInfo.open_date} <span>{movieInfo.genres}</span>
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
                  {movieInfo.actors.map((character, index) => (
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
                  ))}
                </ul>
              </div>
              <div className="movie-info4">
                <h3>한줄리뷰</h3>
                <form action="/detail" ref={formtag}>
                  <fieldset>
                    <legend className="readable-hidden">영화 감상평</legend>
                    <input
                      type="text"
                      value={value}
                      placeholder="관람평을 작성해주세요"
                      onChange={addComment}
                      onKeyPress={enterPressComment}
                    />
                    <button type="button" onClick={handleAddComment}>
                      관람평 작성
                    </button>
                  </fieldset>
                </form>
                <ul className="comments">
                  {comments.map((v, i) => (
                    <li key={i}>
                      <div>
                        <p>{v.comment}</p>
                        <p>
                          <span>
                            <img src={unlike_thumb} alt="좋아요 안한 상태" />
                            {v.like}
                          </span>
                          <button>좋아요</button>
                        </p>
                      </div>
                      <span>{v.nickname}</span>
                    </li>
                  ))}
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

  function addComment(e: any) {
    setvalue(e.target.value);
  }

  function handleAddComment() {
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
  }

  function enterPressComment(e: any) {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    handleAddComment();
  }
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
    return <img src={BookmarkEmpty} alt="" />;
  } else {
    return <img src={BookmarkFull} alt="" />;
  }
};
