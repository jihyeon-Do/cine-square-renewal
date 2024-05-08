import React, {
  useRef,
  useState,
  useEffect,
  ChangeEvent,
  useLayoutEffect,
} from 'react';
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
import APIService from '../service/APIService';

// import APIService from '../service/APIService';

// const AWSAPI = APIService.AWSAPI;
// const PROXY = APIService.PROXY;

// let evaluatedMovieCount = [];
// let evaluatedMovieGrade = [];

type UserInfo = {
  account: string;
  name: string;
  nickname: string;
  user_id: number;
};

export default function Profile() {
  const [imgUrl, setImgUrl] = useState<string>('');
  const [evaluatedCount, setEvaluatedCount] = useState([]);
  const [evaluatedGrade, setEvaluatedGrade] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [evaluatedMovieList, setEvaluatedMovieList] = useState([]);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [evaluated, setEvaluated] = useState({
    movie: 0,
    see: 0,
    comment: 0,
  });
  const [likeCommentCounts, setLikeCommentCounts] = useState();

  const imageRef = useRef(null);
  const canvasDom = useRef<HTMLCanvasElement | null>(null);

  const access_token = sessionStorage.getItem('token');
  const bearer_header = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  const LOCALAPI = APIService.LOCALAPI;

  //   const account = useSelector((state) => state.auth.account);
  //   const userName = useSelector((state) => state.auth.userName);

  //: 평가한 영화 분포 점수 리스트 받아오기
  Chart.register(...registerables);

  useEffect(() => {
    async function Evaluated() {
      try {
        const response = await axios(
          `${LOCALAPI}/api/user-reports/movie-rating`,
          bearer_header,
        );
        const result = response.data.list;
        const evaluatedMovieCount = result.map((v: any) => +v.count);
        const evaluatedMovieGrade = result.map((v: any) => v.score + '점');
        setEvaluatedCount(evaluatedMovieCount);
        setEvaluatedGrade(evaluatedMovieGrade);
        let a = 0;
        for (let i = 0; i < evaluatedMovieCount.length; i++) {
          a += evaluatedMovieCount[i];
        }
        setTotalCount(a);
      } catch (e) {
        console.log(e);
      }
    }
    Evaluated();
  }, []);

  //: 평가한 영화 분포 점수 리스트 차트로 그리기
  useEffect(() => {
    if (canvasDom.current) {
      const ctx = canvasDom.current.getContext(
        '2d',
      ) as CanvasRenderingContext2D;
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: evaluatedGrade,
          datasets: [
            {
              barPercentage: 1,
              barThickness: 25,
              backgroundColor: '#6100ff',
              label: '내가 해당 점수로 평가한 영화 갯수',
              data: evaluatedCount,
            },
          ],
        },
      });
      return () => {
        myChart.destroy();
      };
    }
  }, [evaluatedCount, evaluatedGrade]);

  //: 내정보 가져오기
  useEffect(() => {
    const getMyInfo = async () => {
      const myInfo = await axios.get(`${LOCALAPI}/api/users/me`, bearer_header);
      setUserInfo(myInfo.data.data);
    };
    getMyInfo();
  }, []);

  //: 평가한 영화 갯수, 작성한 코멘트 갯수 가져오기
  useEffect(() => {
    const evaluateCounts = async () => {
      const moive = await axios.get(
        `${LOCALAPI}/api/user-reports/score-counts`,
        bearer_header,
      );
      const comment = await axios.get(
        `${LOCALAPI}/api/movie-reports/comments/counts`,
        bearer_header,
      );
      setEvaluated({
        ...evaluated,
        comment: comment.data.data,
        movie: moive.data.data,
      });
    };
    evaluateCounts();
  }, []);

  useEffect(() => {
    const getLikeCommentCounts = async () => {
      const comment = await axios.get(
        `${LOCALAPI}/api/user-reports/like-comment-counts`,
        bearer_header,
      );
      setLikeCommentCounts(comment.data.data);
    };
    getLikeCommentCounts();
  }, []);

  const hanedleImgChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileUrl = files[0];
      const objectURL = URL.createObjectURL(fileUrl);
      setImgUrl(objectURL);
      // const response = await axios.post(
      //   `${LOCALAPI}/api/upload/users/${myInfo.data.data.user_id}`,
      //   { file: objectURL },
      //   bearer_header,
      // );
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
                      {userInfo && userInfo.nickname}
                    </label>
                    <input
                      type="text"
                      id="user_name"
                      // placeholder={userName}
                      placeholder={userInfo?.nickname}
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
                      placeholder={userInfo?.account}
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
                    <span>{evaluated.movie}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/mychoice/:listname">
                    <span>보고싶어요</span>
                    <span>{evaluated.see}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/review">
                    <span>작성한 코멘트</span>
                    <span>{evaluated.comment}</span>
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
                  <div className="favorite-person">
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
                  <div className="favorite-person-xs">
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
                    </ul>
                  </div>
                </div>
                <div className="like-comment-list">
                  <h4>
                    좋아요한 코멘트 <span>{likeCommentCounts}</span>
                  </h4>
                  <Link to="/favorite/review" className="add">
                    더보기
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <FooterTemplate />
    </>
  );
}
