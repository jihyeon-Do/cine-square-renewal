import React from 'react';
import HeaderTemplate from '../components/HeaderTemplate';
import FooterTemplate from '../components/FooterTemplate';
import profilePicture from '../images/profile_picture.png';
import { ReactComponent as FullStar1 } from '../images/star-full.svg';
import testPoster from '../images/test_poster.jpeg';

import './commentDetail.scss';

function CommentDetail() {
  return (
    <>
      <HeaderTemplate />
      <main className="comment-detail-main">
        <h2 className="readable-hidden">코멘트 상세 페이지</h2>
        <section>
          <article className="user-movie-info">
            <div>
              <p>
                <img src={profilePicture} alt="코멘트 작성자 프로필 이미지" />
                <span>영화보고 밥먹고 커피마시고</span>
                <span>2024-05-16</span>
              </p>
              <p>범죄도시4</p>
              <p>영화 | 2023</p>
              <span>
                <FullStar1 />
                <span>3.5</span>
              </span>
            </div>
            <div>
              <img src={testPoster} alt="영화 포스터" />
            </div>
          </article>
          <article className="comment-content">
            분명 구릴거란 걸 알면서도 계속 냄새 맡게되는 꼬카인 마냥 안보고
            넘기기에는 끊을 수 없는 중독성이 있는 시리즈.
            <br />
            흉악범죄와 사기가 만연한 요즘, 경찰 무능론이 팽배한 한국사회에서
            어떤 범죄자도 맨손으로 때려 잡는 마석도 형사를 보면서 느끼는
            카타르시스는 너무나 강력하다.
            <br />
            #사실상 이번 편이 범죄도시 3편이라 생각이 들정도로 1, 2편의 마석도
            모습으로 돌아옴.
            <br />
            #주인공인 마석도는 여전히 아날로그적인 모습을 유지하고 있는데,
            범죄수법과 수사방식의 복잡성으로 인해 항상 막무가내식 액션으로
            사건을 마무리하게 되는 아쉬움.
            <br />
            #이번 용병출신의 빌런도 장첸의 야비함과 강해상의 막장스러운
            잔인함에는 못미친다. 그래서인지 마석도의 무차별 액션을 줄이고 빌런의
            잔인함에 더 집중함.
            <br />
            #폴리스 다크 아미 장이수는 이번편 최고의 씬 스틸러이자 웃음벨.
            마석도와 함께 모든 시리즈에 등장하는 조연이라면 뭔가 이유가 있지
            않겠냐?ㅎㅎ
            <br />
            #이쯤되면 범죄도시 결말부는 시리즈 공식 클리셰로 인정해야함.ㅋㅋ
            <br />
            #쿠키영상 없음.
          </article>
          <article className="comment-like-reply-write">
            <div>
              <p>
                좋아요 <span>322</span>
              </p>
              <p>
                댓글 <span>4</span>
              </p>
            </div>
            <div>
              <button>좋아요</button>
              <button>댓글</button>
            </div>
          </article>
          <article className="comment-reply-list">
            {/* <div className="my-comment">
              {comment ? (
                <form action="/detail" ref={formtag} className="is-comment">
                  <fieldset>
                    <legend>내가 작성한 코멘트</legend>
                    <input
                      type="text"
                      value={value}
                      // placeholder={comment.content}
                      onChange={addComment}
                      onKeyDown={enterPressComment}
                      readOnly={true}
                      ref={editCommentInput}
                    />
                    {status === 'readOnly' ? (
                      <div>
                        <button type="button" onClick={editComment}>
                          수정
                        </button>
                        <button type="button" onClick={deleteComment}>
                          삭제
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button type="button" onClick={cancel}>
                          취소
                        </button>
                        <button type="button" onClick={sendEditComment}>
                          완료
                        </button>
                      </div>
                    )}
                  </fieldset>
                </form>
              ) : (
                <form action="/detail" ref={formtag} className="no-comment">
                  <fieldset>
                    <legend>코멘트 작성하기</legend>
                    <input
                      type="text"
                      value={value}
                      placeholder="기대평, 관람평을 자유롭게 작성해주세요!"
                      onChange={addComment}
                      onKeyDown={enterPressComment}
                    />
                    <button type="button" onClick={handleAddComment}>
                      코멘트 작성
                    </button>
                  </fieldset>
                </form>
              )}
            </div> */}
            <ul>
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
            </ul>
          </article>
        </section>
      </main>
      <FooterTemplate />
    </>
  );
}

export default CommentDetail;
