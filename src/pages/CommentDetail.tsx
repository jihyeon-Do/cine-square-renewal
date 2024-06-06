import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import HeaderTemplate from '../components/HeaderTemplate';
import FooterTemplate from '../components/FooterTemplate';
import profilePicture from '../images/profile_picture.png';
import { ReactComponent as FullStar1 } from '../images/star-full.svg';
import testPoster from '../images/test_poster.jpeg';
import axios, { AxiosResponse } from 'axios';
import APIService from '../service/APIService';
import './commentDetail.scss';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';

interface CommentContent {
  comment_id: number;
  content: string;
  created: string;
  like: number;
  productionYear: number;
  reply_count: number;
  thumbnail: string;
  title: string;
  updated: string;
}

interface CommentDetailInfo {
  comment_id: number;
  content: string;
  created: string;
  like: number;
  updated: string;
}

type UserInfo = {
  account: string;
  name: string;
  nickname: string;
  user_id: number;
};

interface Reply {
  content: string;
  created: string;
  like: number;
  reply_id: number;
  updated: string;
  user_id: number;
}

function CommentDetail() {
  //: movie id는 location state에서 가져오고 comment id는 path에서 가져온다.
  const [commentContent, setCommentContent] = useState<CommentContent | null>(
    null,
  );
  const [replies, setReplies] = useState<Reply[]>([]);
  const [value, setValue] = useState('');
  const [comment, setComment] = useState<Comment | null>(null);
  const [modal, setModal] = useState('false');
  const [isLike, setIsLike] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [replyId, setReplyId] = useState(null);
  const [confirm, setConfirm] = useState('false');

  const navigate = useNavigate();

  const LOCALAPI = APIService.LOCALAPI;
  const location = useLocation();
  const { commentId } = useParams();
  const locationState = location.state as {
    movieId: string;
    nickname: string;
    score: number;
    isMyComment: boolean;
  };
  const access_token = sessionStorage.getItem('token');
  const bearer_header = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  //: 날짜편집
  const getCreatedDate = (data: string) => {
    const date = new Date(data);
    const year = date.getFullYear();
    const month = date.getMonth();
    const getDate = date.getDate();
    const createdDate = `${year}-${month < 10 ? '0' + month : month}-${getDate < 10 ? '0' + getDate : getDate}`;
    return createdDate;
  };

  //: 코멘트 정보 가져오기
  useEffect(() => {
    const getCommentDetailInfo = async () => {
      const response = await axios.get(
        `${LOCALAPI}/api/movie-reports/${locationState.movieId}/comments/${commentId}`,
      );
      const createdDate = getCreatedDate(response.data.result.created);
      const commentMovieInfo = await axios.get(
        `${LOCALAPI}/api/movies/${locationState.movieId}`,
      );
      setCommentContent({
        ...response.data.result,
        thumbnail: commentMovieInfo.data.data.thumbnail,
        title: commentMovieInfo.data.data.title,
        productionYear: commentMovieInfo.data.data.production_year,
        created: createdDate,
      });
    };
    getCommentDetailInfo();
  }, []);

  //: 코멘트 대댓글 리스트 가져오기
  useEffect(() => {
    const getRelpies = async () => {
      const response = await axios.get(
        `${LOCALAPI}/api/movie-reports/comments/${commentId}`,
      );
      setReplies(response.data.list);
    };
    getRelpies();
  }, []);

  //: 해당 코멘트 좋아요 여부 확인
  useEffect(() => {
    const getLikeComments = async () => {
      const response = await axios.get(
        `${LOCALAPI}/api/user-reports/me/movies/-/like-comments`,
        bearer_header,
      );
      response.data.list.map((v: any) => {
        if (v.comment_id === Number(commentId)) {
          setIsLike(true);
        }
      });
    };
    if (access_token) {
      getLikeComments();
    }
  }, []);

  //: 내정보
  useEffect(() => {
    const getMyInfo = async () => {
      const myInfo = await axios.get(`${LOCALAPI}/api/users/me`, bearer_header);
      setUserInfo(myInfo.data.data);
    };
    if (access_token) {
      getMyInfo();
    }
  }, []);

  //: 댓글 value
  function addReply(e: { target: { value: React.SetStateAction<string> } }) {
    setValue(e.target.value);
  }
  //: 로그인 확인
  const requiredLogin = () => {
    alert('로그인 후 이용해 주세요');
    navigate('/signin');
    // dispatch(push('/signin'));
  };

  // //: 엔터로 댓글 달기
  // function enterPressReply(e: { key: string; preventDefault: () => void }) {
  //   if (e.key !== 'Enter') return;
  //   e.preventDefault();
  //   handleAddReply();
  // }

  //: 버튼 클릭으로 댓글 달기
  async function handleAddReply() {
    if (access_token) {
      try {
        const response = await axios.post(
          `${LOCALAPI}/api/movie-reports/${locationState.movieId}/comments/${commentId}/replies`,
          {
            content: value,
          },
          bearer_header,
        );
        setModal('false');
        setReplies([response.data.data, ...replies]);
        // setComments([...comments, response.data.data]);
        // const myComment = await axios.get(
        //   `${LOCALAPI}/api/user-reports/movies/${locationState.movieId}/comment`,
        //   bearer_header,
        // );
        // setComment(myComment.data.result);
      } catch (error) {
        console.log(error);
      }
    } else {
      requiredLogin();
    }
  }

  //: 코멘트, 댓글 수정하기
  async function handleEditModalValue() {
    try {
      if (replyId) {
        const response = await axios.patch(
          `${LOCALAPI}/api/movie-reports/${locationState.movieId}/comments/${commentId}/replies/${replyId}`,
          { content: value },
          bearer_header,
        );
        const AfterEditMyReplies = replies.map((v: any, i) => {
          if (v.user_id === userInfo?.user_id) {
            return { ...v, content: value };
          }
        });
        setReplies(AfterEditMyReplies);
      } else {
        const response = await axios.patch(
          `${LOCALAPI}/api/user-reports/-/movies/${locationState.movieId}/comments/${commentId}`,
          { content: value },
          bearer_header,
        );
        if (commentContent) {
          setCommentContent({
            ...commentContent,
            content: response.data.data.content,
          });
        }
      }
      setModal('false');
    } catch (error) {
      console.log(error);
    }
  }

  //: 코멘트 삭제하기
  async function deleteComment() {
    try {
      const response = await axios.delete(
        `${LOCALAPI}/api/user-reports/-/movies/${locationState.movieId}/comments/${commentId}`,
        bearer_header,
      );
      setConfirm('false');
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  }

  //: 댓글 삭제하기
  async function deleteReply() {
    try {
      const response = await axios.delete(
        `${LOCALAPI}/api/movie-reports/${locationState.movieId}/comments/${commentId}/replies/${replyId}`,
        bearer_header,
      );
      setConfirm('false');
      const filteringReplies = replies.filter((v, i) => {
        return v.reply_id !== replyId;
      });
      setReplies(filteringReplies);
    } catch (error) {
      console.log(error);
    }
  }

  //: 좋아요 토글
  async function likeToggle() {
    try {
      if (isLike) {
        const response = await axios.delete(
          `${LOCALAPI}/api/user-reports/-/movies/${locationState.movieId}/comments/${commentId}/like`,
          bearer_header,
        );
        if (response.status === 204) {
          if (commentContent) {
            setCommentContent({
              ...commentContent,
              like: commentContent.like - 1,
            });
          }
          setIsLike(false);
        }
      } else {
        const response = await axios.post(
          `${LOCALAPI}/api/user-reports/-/movies/${locationState.movieId}/comments/${commentId}/like`,
          {},
          bearer_header,
        );
        if (response.status === 200) {
          if (commentContent) {
            setCommentContent({
              ...commentContent,
              like: commentContent.like + 1,
            });
          }
          setIsLike(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <HeaderTemplate />
      <main className="comment-detail-main">
        <h2 className="readable-hidden">코멘트 상세 페이지</h2>
        <section>
          {commentContent && (
            <>
              <article className="user-movie-info">
                <div>
                  <p>
                    <img
                      src={profilePicture}
                      alt="코멘트 작성자 프로필 이미지"
                    />
                    <span>{locationState.nickname}</span>
                    <span>{commentContent.created}</span>
                  </p>
                  <p>{commentContent.title}</p>
                  <p>영화 | {commentContent.productionYear}</p>
                  {locationState.score !== 0 && (
                    <span>
                      <FullStar1 />
                      <span>{locationState.score}</span>
                    </span>
                  )}
                </div>
                <div>
                  <img src={commentContent.thumbnail} alt="영화 포스터" />
                </div>
              </article>
              <article className="comment-content">
                {commentContent.content}
              </article>
              <article className="comment-like-reply-write">
                <div>
                  <div>
                    <p>
                      좋아요 <span>{commentContent.like}</span>
                    </p>
                    <p>
                      댓글 <span>{commentContent.reply_count}</span>
                    </p>
                  </div>
                  {locationState.isMyComment && (
                    <div>
                      <button
                        onClick={() => {
                          setModal('내 코멘트 수정하기');
                          setValue(commentContent.content);
                        }}
                      >
                        수정
                      </button>
                      <button onClick={() => setConfirm('코멘트')}>삭제</button>
                    </div>
                  )}
                </div>
                <div className="like-and-reply">
                  <button
                    onClick={likeToggle}
                    className={`${isLike ? 'active' : ''}`}
                  >
                    좋아요
                  </button>
                  <button
                    onClick={() => {
                      if (access_token) {
                        setModal('댓글 작성하기');
                        setValue('');
                      } else {
                        requiredLogin();
                      }
                    }}
                  >
                    댓글
                  </button>
                </div>
              </article>
            </>
          )}

          <article className="comment-reply-list">
            <ul>
              {replies.length !== 0 ? (
                replies.map((v: any, i) => (
                  <li key={i}>
                    <div className="writer-profile-img">
                      <img
                        src={profilePicture}
                        alt="댓글 작성자 프로필 이미지"
                      />
                    </div>
                    <div className="writer-content">
                      <div>
                        <p>소금사탕</p>
                        <p>{v.content}</p>
                      </div>
                      <div>
                        <p className="writen-date">
                          {getCreatedDate(v.created)}
                        </p>
                        {userInfo?.user_id === v.user_id && (
                          <div>
                            <button
                              onClick={() => {
                                setModal('댓글 수정하기');
                                setValue(v.content);
                                setReplyId(v.reply_id);
                              }}
                            >
                              수정
                            </button>
                            <button
                              onClick={() => {
                                setReplyId(v.reply_id);
                                setConfirm('댓글');
                              }}
                            >
                              삭제
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li>댓글이 없습니다.</li>
              )}
            </ul>
          </article>
        </section>
      </main>
      <Modal
        modal={modal}
        setModal={setModal}
        value={value}
        setValue={setValue}
        handleAddReply={handleAddReply}
        addReply={addReply}
        handleEditModalValue={handleEditModalValue}
      />
      <ConfirmModal
        confirm={confirm}
        setConfirm={setConfirm}
        deleteComment={deleteComment}
        deleteReply={deleteReply}
      />
      <FooterTemplate />
    </>
  );
}

export default CommentDetail;
