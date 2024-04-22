import React, { useState, useEffect, useCallback } from 'react';
import HeaderTemplate from '../components/HeaderTemplate';
import FooterTemplate from '../components/FooterTemplate';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
// import './mychoice.scss';
import backHistory from '../images/arrow_back.png';
import { individualList } from '../data/CineSuggestionMovieList';
import { ReactComponent as EmptyStar } from '../images/star-empty1.svg';
import { ReactComponent as HalfStar } from '../images/star-half1.svg';
import { ReactComponent as FullStar } from '../images/star-full1.svg';
import { ReactComponent as FullStar1 } from '../images/star-full.svg';
import { ReactComponent as Reset } from '../images/reset.svg';
import './evaluation.scss';

export default function Evaluation() {
  const MAX_SCORE = 5;
  const [score, setScore] = useState(0);
  const [displayScore, setDisplayScore] = useState(score);

  const location = useLocation();

  const handleMouseMove = useCallback((e: any) => {
    setDisplayScore(calculateScore(e));
  }, []);
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
  const calculateScore = (e: {
    currentTarget: { getBoundingClientRect: () => { width: any; left: any } };
    clientX: number;
  }) => {
    const { width, left } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const scale = width / MAX_SCORE / 2;
    return (Math.floor(x / scale) + 1) / 2;
  };

  const sendScore = async function (v: number) {
    // if (account === null) return;
    try {
      //   const response = await axios({
      //     method: 'POST',
      //     url: `${LOCALAPI}/api/user-reports/score`,
      //     // url: `${LOCALAPI}/user/selectMovieGrade`,
      //     data: {
      //       user_id: 6,
      //       movie_id: movieId,
      //       score: v,
      //     },
      //   });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <HeaderTemplate />
      <main className="evaluation-main">
        <h2 className="a11y-hidden">평가하기</h2>
        <button className="back">
          <img src={backHistory} alt="뒤로가기" />
        </button>
        <section className="evalutaion">
          <div>
            <p className="count">23</p>
            <p className="aside">내가 본 영화들을 평가해볼까요?</p>
          </div>
          <ul>
            {individualList.map((v, i) => (
              <li key={v.movie.movie_id}>
                <img src={v.movie.thumbnail} alt={v.movie.title} />
                <div>
                  <div>
                    <p>{v.movie.title}</p>
                    <span>
                      {v.movie.production_year} {v.movie.nation}
                    </span>
                  </div>
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
                    {/* <span>{displayScore} 점으로 평가하셨습니다.</span> */}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
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
