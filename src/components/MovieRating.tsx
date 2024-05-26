import React, { useCallback, useState } from 'react';
import { ReactComponent as Reset } from '../images/reset.svg';
import { ReactComponent as EmptyStar } from '../images/star-empty1.svg';
import { ReactComponent as HalfStar } from '../images/star-half1.svg';
import { ReactComponent as FullStar } from '../images/star-full1.svg';
import axios from 'axios';
import APIService from '../service/APIService';
import { useNavigate } from 'react-router-dom';

interface Rating {
  randomMovies: any;
  MAX_SCORE: number;
  v: any;
  movieId: number;
}

export default function MovieRating({
  randomMovies,
  MAX_SCORE,
  v,
  movieId,
}: Rating) {
  const [score, setScore] = useState<number | null>(null);
  const [displayScore, setDisplayScore] = useState<number | null>(score);
  const navigate = useNavigate();

  const LOCALAPI = APIService.LOCALAPI;
  const access_token = sessionStorage.getItem('token');
  const bearer_header = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  const requiredLogin = () => {
    alert('로그인 후 이용해 주세요');
    navigate('/signin');
    // dispatch(push('/signin'));
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

  const handleChange = (v: number | null, type: string) => {
    if (access_token) {
      if (score === 0 && displayScore === 0) return;
      sendScore(v, type);
      setScore(v);
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

  const handleMouseMove = useCallback(
    (e: any, id: number) => {
      randomMovies.map((v: any) => {
        if (v.movie_id === id) {
          setDisplayScore(calculateScore(e));
        } else {
          return;
        }
      });
    },
    [randomMovies],
  );

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
  return (
    <>
      <img src={v.thumbnail} alt={v.title} />
      <div>
        <div>
          <p>{v.title}</p>
          <span>
            {v.production_year} {v.nation}
          </span>
        </div>
        <div className="rating">
          <section>
            <div
              className="stars"
              onMouseMove={(e) => handleMouseMove(e, v.movie_id)}
              onMouseLeave={() => setDisplayScore(score)}
              onClick={() =>
                displayScore && handleChange(displayScore, 'registration')
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
        </div>
      </div>
    </>
  );
}
