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

function CommentDetail() {
  //: movie id는 location state에서 가져오고 comment id는 path에서 가져온다.
  const [commentContent, setCommentContent] = useState<CommentContent | null>();
  const [replies, setReplies] = useState([]);
  const [value, setValue] = useState('');
  const [comment, setComment] = useState<Comment | null>(null);
  const [modal, setModal] = useState(false);

  const formtag = useRef(null);
  const navigate = useNavigate();

  const LOCALAPI = APIService.LOCALAPI;
  const location = useLocation();
  const { commentId } = useParams();
  const locationState = location.state as {
    movieId: string;
    nickname: string;
    score: number;
  };
  const access_token = sessionStorage.getItem('token');
  const bearer_header = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  //: 날짜편집
  const getCreatedDate = (data: CommentDetailInfo) => {
    const date = new Date(data.created);
    const year = date.getFullYear();
    const month = date.getMonth();
    const getDate = date.getDate();
    const createdDate = `${year}-${month < 10 ? '0' + month : month}-${getDate}`;
    return createdDate;
  };

  //: 코멘트 정보 가져오기
  useEffect(() => {
    const getCommentDetailInfo = async () => {
      const response = await axios.get(
        `${LOCALAPI}/api/movie-reports/${locationState.movieId}/comments/${commentId}`,
      );
      const createdDate = getCreatedDate(response.data.result);
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

  //: 코멘트 대댓글 가져오기
  useEffect(() => {
    const getRelpies = async () => {
      const response = await axios.get(
        `${LOCALAPI}/api/movie-reports/comments/${commentId}`,
      );
      setReplies(response.data.list);
    };
    getRelpies();
  }, []);

  function addComment(e: any) {
    setValue(e.target.value);
  }

  const requiredLogin = () => {
    alert('로그인 후 이용해 주세요');
    navigate('/signin');
    // dispatch(push('/signin'));
  };

  function enterPressComment(e: { key: string; preventDefault: () => void }) {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    handleAddComment();
  }

  async function handleAddComment() {
    if (access_token) {
      try {
        const response = await axios.post(
          `${LOCALAPI}/api/movie-reports/${locationState.movieId}/comments`,
          {
            content: value,
          },
          bearer_header,
        );
        // setComments([...comments, response.data.data]);
        const myComment = await axios.get(
          `${LOCALAPI}/api/user-reports/movies/${locationState.movieId}/comment`,
          bearer_header,
        );
        setComment(myComment.data.result);
      } catch (error) {
        console.log(error);
      }
    } else {
      requiredLogin();
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
                  <p>
                    좋아요 <span>{commentContent.like}</span>
                  </p>
                  <p>
                    댓글 <span>{commentContent.reply_count}</span>
                  </p>
                </div>
                <div>
                  <button>좋아요</button>
                  <button
                    onClick={() => {
                      setModal(true);
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
                <li>
                  <div className="writer-profile-img">
                    <img src={profilePicture} alt="댓글 작성자 프로필 이미지" />
                  </div>
                  <div className="writer-content">
                    <div>
                      <p>소금사탕</p>
                      <p>완벽 정리입니다!</p>
                    </div>
                    <p className="writen-date">12일전</p>
                  </div>
                </li>
              ) : (
                <li>댓글이 없습니다.</li>
              )}
            </ul>
          </article>
        </section>
      </main>
      <div className={`reply-modal ${modal ? 'active' : ''}`}>
        <div
          className="blur"
          onClick={() => {
            setModal(false);
          }}
        ></div>
        <div className="replies">
          <form action="/detail" ref={formtag} className="write-replies">
            <fieldset>
              <legend>댓글 작성하기</legend>
              <textarea
                // type="text"
                value={value}
                placeholder="자유롭게 댓글을 달아주세요!"
                onChange={addComment}
                onKeyDown={enterPressComment}
              />
              <button type="button" onClick={handleAddComment}>
                댓글 작성
              </button>
            </fieldset>
          </form>
          <button
            className="close-modal"
            onClick={() => {
              setModal(false);
            }}
          >
            x
          </button>
        </div>
      </div>
      <FooterTemplate />
    </>
  );
}

export default CommentDetail;
