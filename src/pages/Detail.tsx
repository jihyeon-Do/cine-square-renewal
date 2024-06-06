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
import likeThumb from '../images/like_thumb.png';
import commentIcon from '../images/comment_icon.png';
import profilePicture from '../images/profile_picture.png';
import noImg from '../images/no-image.png';

import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

import APIService from '../service/APIService';

// const AWSAPI = APIService.AWSAPI;
const LOCALAPI = APIService.LOCALAPI;
// const PROXY = APIService.PROXY;

type movieDetailInfoType = {
  title: string;
  open_date: number;
  genres: string[];
  nations: string[];
  running_time: string;
  images: string[];
  score: number;
  actors: string[];
  content: string;
  title_en: string;
  production_year?: number;
  synopsys: string;
  thumbnail: string;
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
  isLike?: boolean;
};

type Comment = {
  comment_id: number;
  content: string;
  created: string;
  like: number;
  reply_count: number;
  updated: string;
};

const MAX_SCORE = 5;

export default function Detail() {
  const [score, setScore] = useState<number | null>(null);
  const [displayScore, setDisplayScore] = useState<number | null>(score);
  const [bookmark, setBookmark] = useState(false);
  const [value, setValue] = useState('');
  //: 코멘트 상태
  const [status, setStatus] = useState('null');
  const [comment, setComment] = useState<Comment | null>(null);
  const [comments, setComments] = useState<commentsList[]>([]);
  const [seeMore, setSeeMore] = useState(false);
  const [movieInfo, setMovieInfo] = useState<movieDetailInfoType | null>(null);
  const [isLike, setIsLike] = useState(false);

  // const [isCommunicating, setIsCommunicating] = useState(false);
  // const isCommunicating = useRef<boolean>(false);
  let isCommunicating = false;
  const formtag = useRef(null);

  const editCommentInput = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const { movieId } = useParams<{ movieId?: string }>();
  const access_token = sessionStorage.getItem('token');
  const bearer_header = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  //   const token = useSelector((state) => state.auth.token);
  //   const account = useSelector((state) => state.auth.account);
  //   const userName = useSelector((state) => state.auth.userName);

  /**
   *
   * 상태 : readonly, post, patch, delete, null
   * api를 보내기전에 무슨상태인지 알아야한다. api 중복요청 안되게끔
   */

  const requiredLogin = () => {
    alert('로그인 후 이용해 주세요');
    navigate('/signin');
    // dispatch(push('/signin'));
  };

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

  //: 영화 상세 정보, 유저가 평가한 점수, 유저 보고싶어요 상태
  useEffect(() => {
    async function userMovieInfo() {
      try {
        //: 나의 보고싶어요 상태
        const statusResponse = await axios.get(
          `${LOCALAPI}/api/user-reports/me/movies/${movieId}/status`,
          bearer_header,
        );
        setBookmark(statusResponse.data.result);
        //: 내 별점
        const scoreResponse = await axios.get(
          `${LOCALAPI}/api/user-reports/me/movies/${movieId}/score`,
          bearer_header,
        );
        setScore(scoreResponse.data.data.score); // 여기를 수정
        setDisplayScore(scoreResponse.data.data.score); // 여기를 수정
        //: 내 코멘트
        const myComment = await axios.get(
          `${LOCALAPI}/api/user-reports/-/movies/${movieId}/comment`,
          bearer_header,
        );
        if (myComment.status === 204) {
          setComment(null);
        } else {
          setComment(myComment.data.result);
          setValue(myComment.data.result.content);
          setStatus('readOnly');
        }
      } catch (error) {
        // console.log(error);
      }
    }
    if (access_token) {
      userMovieInfo();
    }
  }, []);

  useEffect(() => {
    async function getMovieInfo() {
      try {
        const response = await axios.get(`${LOCALAPI}/api/movies/${movieId}`);
        //: actor가 null이 아닐 때
        if (response.data.data.actors) {
          const actor = response.data.data.actors;
          //: directors도 null이 아닌지 체크
          if (response.data.data.directors) {
            const directors = response.data.data.directors;
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
            const directors = response.data.data.directors;
            const copyMovieDetail = {
              ...response.data.data,
              actors: directors,
            };
            setMovieInfo(copyMovieDetail);
          } else {
            setMovieInfo(response.data.data);
          }
        }
        //: 영화별 comments
        const commentScore = await axios.get(
          `${LOCALAPI}/api/movie-reports/summary/movies/${movieId}`,
        );
        const addIsLike = commentScore.data.list.map((value: commentsList) => {
          return { ...value, isLike: false };
        });
        setComments(addIsLike);
        if (access_token) {
          const userLikeCommentsList = await axios.get(
            `${LOCALAPI}/api/user-reports/-/movies/${movieId}/like-comments`,
            bearer_header,
          );
          if (userLikeCommentsList.data.list.length) {
            let copyCommentList: commentsList[] = [];
            addIsLike.map((value: commentsList) => {
              for (let i = 0; i < userLikeCommentsList.data.list.length; i++) {
                if (value.comment_id === userLikeCommentsList.data.list[i]) {
                  copyCommentList = [
                    ...copyCommentList,
                    { ...value, isLike: true },
                  ];
                  break;
                } else if (i === userLikeCommentsList.data.list.length - 1) {
                  copyCommentList = [...copyCommentList, value];
                }
              }
            });
            setComments(copyCommentList);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    getMovieInfo();
  }, [movieId]);

  const handleChange = (v: number | null, type: string) => {
    if (access_token) {
      if (score === 0 && displayScore === 0) return;
      sendScore(v, type);
      setScore(v);
    } else {
      requiredLogin();
    }
  };

  const sendScore = async function (v: number | null, type: string) {
    if (access_token) {
      try {
        if (!score && type === 'registration') {
          //: 첫 등록
          await axios.post(
            `${LOCALAPI}/api/user-reports/-/movies/${movieId}/score`,
            {
              score: v,
            },
            bearer_header,
          );
        } else if (score && type === 'registration') {
          if (score === v) return;
          //: 수정
          await axios.patch(
            `${LOCALAPI}/api/user-reports/-/movies/${movieId}/score`,
            {
              score: v,
            },
            bearer_header,
          );
        } else if (score && type === 'delete') {
          //: 점수 삭제
          await axios.delete(
            `${LOCALAPI}/api/user-reports/-/movies/${movieId}/score`,
            bearer_header,
          );
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      requiredLogin();
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
    if (access_token) {
      if (bookmark) {
        const response = await axios.delete(
          `${LOCALAPI}/api/user-reports/-/movies/${movieId}/status`,
          bearer_header,
        );
        if (response.status === 200) {
          setBookmark(!bookmark);
        }
      } else {
        const response = await axios.post(
          `${LOCALAPI}/api/user-reports/-/movies/${movieId}/status`,
          {},
          bearer_header,
        );
        if (response.status === 200) {
          setBookmark(!bookmark);
        }
      }
    } else {
      requiredLogin();
    }
  };

  //: 유저별 코멘트 좋아요 리스트
  // const userLikeComments = async () => {
  //   const response = await axios.get(
  //     `${LOCALAPI}/api/user-reports/like-comments/users/${6}`,
  //   );
  //   console.log(response);
  // };

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
            `${LOCALAPI}/api/user-reports/-/movies/${movieId}/comments/${commentId}/like`,
            {},
            bearer_header,
          );
          if (response.status === 200) {
            let copyComments: any[] = [];
            comments.map((v, i) => {
              if (v.comment_id === commentId) {
                copyComments = [
                  ...copyComments,
                  { ...v, like: v.like + 1, isLike: true },
                ];
              } else {
                copyComments = [...copyComments, v];
              }
            });
            setComments(copyComments);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        //: like 취소하기
        try {
          const response = await axios.delete(
            `${LOCALAPI}/api/user-reports/-/movies/${movieId}/comments/${commentId}/like`,
            bearer_header,
          );
          if (response.status === 204) {
            let copyComments: any[] = [];
            comments.map((v, i) => {
              if (v.comment_id === commentId) {
                copyComments = [
                  ...copyComments,
                  { ...v, like: v.like - 1, isLike: false },
                ];
              } else {
                copyComments = [...copyComments, v];
              }
            });
            setComments(copyComments);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      requiredLogin();
    }
  }

  function addComment(e: any) {
    setValue(e.target.value);
  }

  //: input에서 enter눌렀을 때
  function enterPressComment(
    e: { key: string; preventDefault: () => void },
    action: string,
  ) {
    if (e.key !== 'Enter') return;
    if (status === 'readOnly') return;
    e.preventDefault();
    setStatus(action);
  }

  //: comment 등록, 수정, 취소, 삭제 버튼 눌렀을 때 action
  function clickCommentButton(action: string) {
    setStatus(action);
  }

  useEffect(() => {
    if (status === 'create') {
      handleAddComment();
    } else if (status === 'not-readOnly') {
      editComment();
    } else if (status === 'edit') {
      sendEditComment();
    } else if (status === 'cancel') {
      cancel();
    } else if (status === 'delete') {
      deleteComment();
    }
  }, [status]);

  async function handleAddComment() {
    if (isCommunicating) return;

    if (status === 'create') {
      isCommunicating = true;
      if (access_token) {
        if (!value) return;
        const removeSpace = value.trim();
        try {
          const response = await axios.post(
            `${LOCALAPI}/api/user-reports/-/movies/${movieId}/comments`,
            {
              content: removeSpace,
            },
            bearer_header,
          );
          // setComments([...comments, response.data.data]);
          const myComment = await axios.get(
            `${LOCALAPI}/api/user-reports/-/movies/${movieId}/comment`,
            bearer_header,
          );
          if (myComment.status === 204) {
            setComment(null);
          } else {
            setComment(myComment.data.result);
            setStatus('readOnly');
          }
        } catch (error) {
          console.log(error);
        } finally {
          isCommunicating = false;
        }
      } else {
        requiredLogin();
      }
    }
  }

  function editComment() {
    if (editCommentInput.current) {
      editCommentInput.current.readOnly = false;
      editCommentInput.current.className = 'active';
    }
  }

  async function sendEditComment() {
    if (isCommunicating) return;

    if (status === 'edit') {
      isCommunicating = true;
      try {
        const response = await axios.patch(
          `${LOCALAPI}/api/user-reports/-/movies/${movieId}/comments/${comment?.comment_id}`,
          { content: value },
          bearer_header,
        );
        if (response.status === 200) {
          setStatus('readOnly');
          setComment(response.data.data);
          if (editCommentInput.current) {
            editCommentInput.current.className = '';
            editCommentInput.current.readOnly = true;
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        isCommunicating = false;
      }
    }
  }

  async function deleteComment() {
    if (isCommunicating) return;

    if (status === 'delete') {
      isCommunicating = true;
      try {
        const response = await axios.delete(
          `${LOCALAPI}/api/user-reports/-/movies/${movieId}/comments/${comment?.comment_id}`,
          bearer_header,
        );
        setComment(null);
        setValue('');
        setStatus('null');
      } catch (error) {
        console.log(error);
      } finally {
        isCommunicating = false;
      }
    }
  }

  function cancel() {
    if (editCommentInput.current) {
      editCommentInput.current.className = '';
      editCommentInput.current.readOnly = true;
    }
    if (comment !== null) {
      setValue(comment.content);
    }
    setStatus('readOnly');
  }

  return (
    <>
      <HeaderTemplate />
      <main className="detail-main">
        <h2 className="readable-hidden">영화상세정보</h2>
        <div className="poster-wrapper">
          <div className="poster-box">
            {/* <div className="poster-box-1"></div> */}
            <div
              className="poster-box-2"
              style={{
                background: `url(${movieInfo?.images[0]}) no-repeat`,
              }}
            ></div>

            {/* <div className="poster-box-3"></div> */}
          </div>
        </div>
        {movieInfo && (
          <section>
            <div className="movie-info">
              <div className="movie-info1">
                <div className="thumbnail">
                  <img
                    src={`${movieInfo.thumbnail === null ? noImg : movieInfo.thumbnail}`}
                    alt={`${movieInfo.title}포스터`}
                  />
                </div>

                <div className="box2">
                  <p className="movie-title">
                    {movieInfo.title} {`(${movieInfo.title_en})`}
                    <button className="bookmark" onClick={handleBookmark}>
                      <Bookmark bookmark={bookmark} />
                      <span>보고싶어요</span>
                    </button>
                  </p>
                  <p className="movie-sub-info">
                    {movieInfo.open_date || movieInfo.production_year}
                    {movieInfo.genres.map((v, i) => (
                      <span key={i}>{v}</span>
                    ))}
                    {movieInfo.nations.map((v, i) => (
                      <span key={i}>{v}</span>
                    ))}
                  </p>
                  <p className="movie-sub-info">{movieInfo.running_time}분</p>
                  <p className="movie-sub-info2">
                    <span>
                      <FullStar1 />
                    </span>
                    평점
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
                        onClick={() =>
                          displayScore &&
                          handleChange(displayScore, 'registration')
                        }
                      >
                        {[...Array(MAX_SCORE)].map((_, i) => (
                          <Star key={i} score={displayScore} i={i} />
                        ))}
                      </div>
                      <Reset
                        className="reset"
                        onClick={() => {
                          handleChange(null, 'delete');
                          setDisplayScore(null);
                        }}
                      ></Reset>
                    </section>
                    <span>
                      {!displayScore ? 0 : displayScore} 점으로 평가하셨습니다.
                    </span>
                  </div>
                  <div className="my-comment">
                    {comment ? (
                      <form
                        ref={formtag}
                        className="is-comment"
                        onSubmit={(e) => e.preventDefault()}
                      >
                        <fieldset>
                          <legend>내가 작성한 코멘트</legend>
                          <input
                            type="text"
                            value={value}
                            // placeholder={comment.content}
                            onChange={addComment}
                            onKeyDown={(e) => enterPressComment(e, 'edit')}
                            readOnly={true}
                            ref={editCommentInput}
                          />
                          {status === 'readOnly' ? (
                            //: 읽기 전용일 때
                            <div>
                              <button
                                type="button"
                                onClick={() =>
                                  clickCommentButton('not-readOnly')
                                }
                              >
                                수정
                              </button>
                              <button
                                type="button"
                                onClick={() => clickCommentButton('delete')}
                              >
                                삭제
                              </button>
                            </div>
                          ) : (
                            //: 수정 상태일 때
                            <div>
                              <button
                                type="button"
                                onClick={() => clickCommentButton('cancel')}
                              >
                                취소
                              </button>
                              <button
                                type="button"
                                onClick={() => clickCommentButton('edit')}
                              >
                                완료
                              </button>
                            </div>
                          )}
                        </fieldset>
                      </form>
                    ) : (
                      <form
                        ref={formtag}
                        className="no-comment"
                        onSubmit={(e) => e.preventDefault()}
                      >
                        <fieldset>
                          <legend>코멘트 작성하기</legend>
                          <input
                            type="text"
                            value={value}
                            placeholder="코멘트를 자유롭게 남겨주세요"
                            onChange={addComment}
                            onKeyDown={(e) => enterPressComment(e, 'create')}
                            // disabled
                          />
                          <button
                            type="button"
                            onClick={() => clickCommentButton('create')} // disabled={true}
                            // className="unclickable"
                          >
                            코멘트 작성
                          </button>
                        </fieldset>
                      </form>
                    )}
                  </div>
                </div>
              </div>
              <div className="movie-info2">
                <h3>소개</h3>
                <div className="movie-sub-info3">
                  <dl>
                    <div>
                      {movieInfo.synopsys ? (
                        <dd
                          dangerouslySetInnerHTML={{
                            __html: movieInfo.synopsys,
                          }}
                        ></dd>
                      ) : (
                        <dd>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Eveniet, explicabo aut consequatur ullam
                          pariatur illum? Fuga magni architecto dolores, iusto
                          quisquam ut recusandae earum nostrum, consequuntur qui
                          voluptatem veniam minus? Lorem ipsum dolor sit amet
                          consectetur adipisicing elit. Eveniet, explicabo aut
                          consequatur ullam pariatur illum? Fuga magni
                          architecto dolores, iusto quisquam ut recusandae earum
                          nostrum, consequuntur qui voluptatem veniam minus?
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Eveniet, explicabo aut consequatur ullam
                          pariatur illum? Fuga magni architecto dolores, iusto
                          quisquam ut recusandae earum nostrum, consequuntur qui
                          voluptatem veniam minus? Lorem ipsum dolor sit amet
                          consectetur adipisicing elit. Eveniet, explicabo aut
                          consequatur ullam pariatur illum? Fuga magni
                          architecto dolores, iusto quisquam ut recusandae earum
                          nostrum, consequuntur qui voluptatem veniam minus?
                        </dd>
                      )}
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
                          src={profilePicture}
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
                <Link to={`/${movieId}/comments`}>더보기</Link>
                <ul className="comments">
                  {comments.length !== 0 ? (
                    comments.map((v, i) => (
                      <li key={i}>
                        <p className="writer">
                          {v.nickname}
                          {v.score ? (
                            <span>
                              <FullStar />
                              {v.score}
                            </span>
                          ) : (
                            <></>
                          )}
                        </p>
                        <div
                          className="content"
                          onClick={() =>
                            navigate(`/comment/detail/${v.comment_id}`, {
                              state: {
                                movieId,
                                nickname: v.nickname,
                                score: v.score,
                                isMyComment:
                                  v.comment_id === comment?.comment_id,
                              },
                            })
                          }
                        >
                          {v.content}
                        </div>
                        <div className="like-recomment">
                          <span>
                            <img src={likeThumb} alt="좋아요" />
                            {v.like}
                          </span>
                          <span
                            onClick={() =>
                              navigate(`/comment/detail/${v.comment_id}`, {
                                state: {
                                  movieId,
                                  nickname: v.nickname,
                                  score: v.score,
                                  isMyComment:
                                    v.comment_id === comment?.comment_id,
                                },
                              })
                            }
                          >
                            <img src={commentIcon} alt="코멘트" />
                            {v.reply_count}
                          </span>
                        </div>
                        <div className="like-btn">
                          <button
                            className={`${v.isLike && 'active'}`}
                            onClick={(e) => like(e, v.comment_id, v.isLike)}
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
                {/* <button className="add-content">더보기</button> */}
              </div>
            </div>
          </section>
        )}
      </main>
      <FooterTemplate />
    </>
  );
}
