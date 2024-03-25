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
import axios from 'axios';

// import APIService from '../service/APIService';

// const AWSAPI = APIService.AWSAPI;
// const LOCALAPI = APIService.LOCALAPI;
// const PROXY = APIService.PROXY;

type movieDetailInfoType = {
  movieNm: string;
  openDt: number;
  janres: string;
  nations: string;
  showTm: string;
  mainImg: string;
  grade: number;
  characterList: string[];
  content: string;
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
  };

  const movieDetailInfo = {
    movieNm: '파묘',
    openDt: 2024,
    janres: '미스터리/스릴러',
    nations: '한국',
    showTm: '2시간 14',
    mainImg: '../images/boxoffice1.jpg',
    grade: 3.5,
    characterList: ['김고은', '이도현', '최민식', '유해진'],
    content: `미국 LA, 거액의 의뢰를 받은 무당 ‘화림’(김고은)과 ‘봉길’(이도현)은 기이한 병이 대물림되는 집안의 장손을 만난다. 조상의 묫자리가 화근임을 알아챈 ‘화림’은 이장을 권하고, 돈 냄새를 맡은 최고의 풍수사 ‘상덕’(최민식)과 장의사 ‘영근’(유해진)이 합류한다.
"전부 잘 알 거야… 묘 하나 잘못 건들면 어떻게 되는지"
절대 사람이 묻힐 수 없는 악지에 자리한 기이한 묘. '상덕'은 불길한 기운을 느끼고 제안을 거절하지만, '화림'의 설득으로 결국 파묘가 시작되고…
나와서는 안될 것이 나왔다.`,
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
    setMovieInfo(movieDetailInfo);
    setComments(commentsList);
  }, []);

  //   useEffect(() => {
  //     async function getMovieInfo() {
  //       try {
  //         const response = await axios.get(
  //           `${PROXY}/movie/movieInfo?movieCd=${movieCd}`,
  //         );
  //         // const response = await axios.get(`${LOCALAPI}/movie/movieInfo?movieCd=${movieCd}`);
  //         setMovieInfo(response.data.result);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //     getMovieInfo();
  //   }, [movieCd]);

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

  //   const sendScore = async function (v) {
  //     if (account === null) return;
  //     try {
  //       const response = await axios({
  //         method: 'POST',
  //         url: `${PROXY}/user/selectMovieGrade`,
  //         // url: `${LOCALAPI}/user/selectMovieGrade`,
  //         data: {
  //           account: account,
  //           cineToken: token,
  //           grade: v,
  //           movieCd: movieCd,
  //         },
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

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
      <main className="detail-main">
        <HeaderTemplate />
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
                <img
                  src={`${movieInfo.mainImg}`}
                  alt={`${movieInfo.movieNm}포스터`}
                />
                <div className="box2">
                  <p className="movie-title">
                    {movieInfo.movieNm}
                    <button className="bookmark" onClick={handleBookmark}>
                      <Bookmark bookmark={bookmark} />
                      <span>보고싶어요</span>
                    </button>
                  </p>
                  <p className="movie-sub-info">
                    {movieInfo.openDt} <span>{movieInfo.janres}</span>
                    <span>{movieInfo.nations}</span>
                  </p>
                  <p className="movie-sub-info">{movieInfo.showTm}분</p>
                  <p className="movie-sub-info2">
                    <span>
                      <FullStar1 />
                    </span>
                    평점 {Number(movieInfo.grade).toFixed(1)}
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
                      <dd>{movieInfo.content}</dd>
                    </div>
                  </dl>
                </div>
                {/* <button onClick={() => setSeeMore(true)}>더보기</button> */}
              </div>

              <div className="movie-info3">
                <h3>출연/제작</h3>
                {/* <ul>
                  {movieInfo.characterList.map((character, index) => (
                    <li key={index}>
                      <img
                        src={`${character.characterImg}`}
                        alt={`${character.realNm}`}
                      />
                      <p>{character.realNm}</p>
                      <p>{character.movieRoll}</p>
                      <p>{character.characterNm}</p>
                    </li>
                  ))}
                </ul> */}
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
