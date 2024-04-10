import React, { useRef, useState, useEffect, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import FooterTemplate from '../components/FooterTemplate';
import HeaderTemplate from '../components/HeaderTemplate';
import '../pages/profile.scss';
import { Chart, registerables } from 'chart.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CineSuggestion from '../components/CineSuggestion';
import { movieStorage } from '../data/CineSuggestionMovieList';
import { actor } from '../data/MyInfo';
import PersonListBox from '../components/PersonListBox';

// import APIService from '../service/APIService';

// const AWSAPI = APIService.AWSAPI;
// const PROXY = APIService.PROXY;

// let evaluatedMovieCount = [];
// let evaluatedMovieGrade = [];

export default function Profile() {
  const [imgUrl, setImgUrl] = useState<string>('');
  const imageRef = useRef(null);
  const canvasDom = useRef(null);
  const [evaluatedCount, setEvaluatedCount] = useState([]);
  const [evaluatedGrade, setEvaluatedGrade] = useState([]);
  const [totalCount, setTotalCount] = useState();
  const [evaluatedMovieList, setEvaluatedMovieList] = useState([]);

  //   const account = useSelector((state) => state.auth.account);
  //   const userName = useSelector((state) => state.auth.userName);

  //   useEffect(() => {
  //     async function Evaluated() {
  //       try {
  //         const response = await axios({
  //           method: 'POST',
  //           url: `${PROXY}/user/gradeList`,
  //           data: {
  //             account: account,
  //           },
  //         });
  //         const result = response.data.result;
  //         evaluatedMovieCount = result.map((v) => +v.count);
  //         evaluatedMovieGrade = result.map((v) => v.grade + '점');
  //         setEvaluatedCount(evaluatedMovieCount);
  //         setEvaluatedGrade(evaluatedMovieGrade);
  //         let a = 0;
  //         for (let i = 0; i < evaluatedMovieCount.length; i++) {
  //           a += evaluatedMovieCount[i];
  //         }
  //         setTotalCount(a);
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     }
  //     Evaluated();
  //   }, [account]);

  //   useEffect(() => {
  //     const ctx = canvasDom.current.getContext('2d');
  //     var myChart = new Chart(ctx, {
  //       type: 'bar',
  //       data: {
  //         labels: evaluatedGrade,
  //         datasets: [
  //           {
  //             barPercentage: 1,
  //             barThickness: 30,
  //             // minBarLength: 2,
  //             backgroundColor: '#6100ff',
  //             label: '내가 해당 점수로 평가한 영화 갯수',
  //             data: evaluatedCount,
  //           },
  //         ],
  //       },
  //     });
  //     return () => {
  //       myChart.destroy();
  //     };
  //   }, [evaluatedCount, evaluatedGrade]);

  Chart.register(...registerables);

  const hanedleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileUrl = files[0];
      const objectURL = URL.createObjectURL(fileUrl);
      setImgUrl(objectURL);
    }
  };

  //   useEffect(() => {
  //     async function EvaluatedMovies() {
  //       try {
  //         const response = await axios({
  //           method: 'POST',
  //           url: `${PROXY}/user/userMovieGrade`,
  //           data: {
  //             account: account,
  //           },
  //         });
  //         const result = response.data.result;
  //         let movieBox = [];
  //         // const evaluatedMoviesList = result.map((v, i) => {
  //         //   return v.movieNm
  //         // });
  //         for (let i = 0; i < 5; i++) {
  //           movieBox = [
  //             ...movieBox,
  //             { movieNm: result[i].movieNm, movieCd: result[i].movieCd },
  //           ];
  //         }
  //         setEvaluatedMovieList(movieBox);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //     EvaluatedMovies();
  //   }, [account]);

  return (
    <>
      <HeaderTemplate />
      <main className="profile-main">
        <div className="myProfile-wrapper">
          <h2 className="a11y-hidden">프로필 기본 정보</h2>
          <div className="profile-info cont">
            <div>
              {/* <p>프로필 사진 업로드하기 <span>(jpg, png, jpeg)</span></p> */}
              <div className="user-image-wrapper">
                <div className="user-image-box">
                  <label
                    htmlFor="file_upload"
                    className="custom-thumbnail-label"
                  >
                    <input
                      id="file_upload"
                      onChange={hanedleImgChange}
                      ref={imageRef}
                      className="custom-thumbnail-input"
                      type="file"
                      alt="profile-image"
                      aria-label="프로필사진"
                      accept="image/jpeg, image/png, image/jpg, image/webp"
                      required
                    />
                    <div
                      className="profile-thumb"
                      style={{ backgroundImage: `url(${imgUrl})` }}
                    />
                  </label>
                </div>
              </div>
              <div className="user-info-box">
                <form>
                  <div className="profile-name user-profile">
                    <label htmlFor="user_name" className="a11y-hidden">
                      이름
                    </label>
                    <input
                      type="text"
                      id="user_name"
                      // placeholder={userName}
                      placeholder="도지현"
                      disabled
                    />
                  </div>
                  <div className="profile-email user-profile">
                    <label htmlFor="user_email" className="a11y-hidden">
                      이메일
                    </label>
                    <input
                      type="text"
                      id="user_email"
                      placeholder="wlgus_57@naver.com"
                      // placeholder={account}
                      disabled
                    />
                  </div>
                  {/* <button className="modify">수정하기</button> */}
                </form>
              </div>
            </div>
            <div className="user-evaluate">
              <ul>
                <li>
                  <Link to="/mychoice/:listname">
                    <span>평가한 영화</span>
                    <span>50</span>
                  </Link>
                </li>
                <li>
                  <Link to="/mychoice/:listname">
                    <span>보고싶어요</span>
                    <span>50</span>
                  </Link>
                </li>
                <li>
                  <Link to="/review">
                    <span>작성한 리뷰</span>
                    <span>14</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <section>
            <div className="profile-full-info">
              <h2 className="a11y-hidden">나의 프로필 상세정보</h2>
              {/* <div className="profile-info-cont5 cont">
                <h3>
                  영화 보관함
                  <Link to="/mybooks" className="add">
                    더보기
                  </Link>
                </h3>
                <article className="rank cine-square-rank">
                  <CineSuggestion title="none" list={movieStorage} />
                </article>
              </div> */}
              <div className="profile-info-cont2 cont">
                <h3>취향분석</h3>
                <div>
                  <canvas ref={canvasDom}></canvas>
                </div>
              </div>

              <div className="profile-info-cont1 cont">
                <h3>선호 배우</h3>
                <PersonListBox person={actor} />
              </div>
              <div className="profile-info-cont1 cont">
                <h3>선호 감독</h3>
                <PersonListBox person={actor} />
              </div>
              <div className="profile-info-cont3 cont">
                <h3>영화 선호 국가</h3>
                <ul>
                  <li>
                    <p>미국</p>
                    <p>20편</p>
                  </li>
                  <li>
                    <p>영국</p>
                    <p>15편</p>
                  </li>
                  <li>
                    <p>한국</p>
                    <p>10편</p>
                  </li>
                  <li>
                    <p>일본</p>
                    <p>5편</p>
                  </li>
                </ul>
              </div>
              <div className="profile-info-cont4 cont">
                <h3>영화 선호 장르</h3>
                <ul>
                  <li>
                    <p>애니메이션</p>
                    <p>20편</p>
                  </li>
                  <li>
                    <p>멜로</p>
                    <p>15편</p>
                  </li>
                  <li>
                    <p>스릴러</p>
                    <p>10편</p>
                  </li>
                  <li>
                    <p>추리</p>
                    <p>5편</p>
                  </li>
                </ul>
              </div>
              <div className="profile-info-cont7 cont">
                <h3>영화 감상 시간</h3>
                <div>
                  <p>
                    <span>100</span>시간
                  </p>
                  <p>
                    무려 <span>{totalCount}56</span>편의 영화를 보셨어요!
                  </p>
                </div>
              </div>
              <div className="profile-info-cont8 cont">
                <h3>좋아요</h3>
                <div>
                  <h4>
                    좋아하는 인물
                    <Link to="/favorite/person" className="add">
                      더보기
                    </Link>
                  </h4>
                  <div>
                    <ul>
                      <li>
                        <figure>
                          <img src="../images/profile_picture.png" alt="" />
                        </figure>
                        <p>도경수</p>
                        <p>배우</p>
                      </li>
                      <li>
                        <figure>
                          <img src="../images/profile_picture.png" alt="" />
                        </figure>
                        <p>도경수</p>
                        <p>배우</p>
                      </li>
                      <li>
                        <figure>
                          <img src="../images/profile_picture.png" alt="" />
                        </figure>
                        <p>도경수</p>
                        <p>배우</p>
                      </li>
                      <li>
                        <figure>
                          <img src="../images/profile_picture.png" alt="" />
                        </figure>
                        <p>도경수</p>
                        <p>배우</p>
                      </li>
                      <li>
                        <figure>
                          <img src="../images/profile_picture.png" alt="" />
                        </figure>
                        <p>도경수</p>
                        <p>배우</p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h4>
                    좋아요한 리뷰
                    <Link to="/favorite/review" className="add">
                      더보기
                    </Link>
                  </h4>
                </div>
              </div>
              {/* <div className="profile-info-cont6 cont">
                <h3>마이 컬렉션</h3>
                <ul>
                  <li>
                    <img src="../images/cruella.jpg" alt="cruella" />
                  </li>
                  <li>
                    <img src="../images/voyagers.jpg" alt="voyagers" />
                  </li>
                  <li>
                    <img
                      src="../images/Fast_and_the_Furious.jpg"
                      alt="Fast_and_the_Furious"
                    />
                  </li>
                  <li>
                    <img src="../images/pipe_line.jpg" alt="pipe_line" />
                  </li>
                  <li>
                    <img src="../images/poupelle.jpg" alt="poupelle" />
                  </li>
                </ul>
                <Link to="/mybooks" className="add">
                  더보기
                </Link>
              </div> */}
            </div>
          </section>
        </div>
      </main>
      <FooterTemplate />
    </>
  );
}
