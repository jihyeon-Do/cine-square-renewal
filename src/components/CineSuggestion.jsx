import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  boxofficeList,
  starRating,
  individualList,
} from '../data/CineSuggestionMovieList';

function CineSuggestion({ title }) {
  let slideIndex = 0;

  const slideWrap = useRef();
  const prevRef = useRef();
  const nextRef = useRef();

  return (
    <>
      <h3>
        {title === 'boxoffice'
          ? '박스오피스 순위'
          : title === 'starRating'
            ? '평균별점이 높은 작품'
            : title === 'individual'
              ? '개인별 추천작'
              : ''}
      </h3>
      <div className="slide-container">
        <ul ref={slideWrap}>
          {(title === 'boxoffice'
            ? boxofficeList
            : title === 'starRating'
              ? starRating
              : title === 'individual'
                ? individualList
                : null
          ).map((v, i) => (
            <li key={i}>
              <Link to={`/detail/${v.movieCd}`}>
                <p className="ranking">{v.id}</p>
                <img src={v.mainImg} alt={v.movieNm} />
                <div className="movie-info">
                  <p className="movie-title">{v.movieNm}</p>
                  <p>{v.openDt}</p>
                  <p>
                    {v.nations} {v.showTm}분
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        onClick={slidePrev}
        ref={prevRef}
        className={`prev-btn`}
      >
        <img src="../images/prev.png" alt="prev" />
      </button>
      <button
        type="button"
        onClick={slideNext}
        ref={nextRef}
        className={`next-btn`}
      >
        <img src="../images/next.png" alt="next" />
      </button>
    </>
  );

  function slidePrev() {
    if (slideIndex === 0) return;
    slideIndex -= 1;
    slideWrap.current.style.transform = `translate(calc(-100%/2 * ${slideIndex}))`;
    prevRef.current.style.display = 'none';
    nextRef.current.style.display = 'block';
  }

  function slideNext() {
    if (slideIndex === 1) return;
    slideIndex += 1;
    slideWrap.current.style.transform = `translate(calc(-100%/2 * ${slideIndex}))`;
    nextRef.current.style.display = 'none';
    prevRef.current.style.display = 'block';
  }
}

export default CineSuggestion;
