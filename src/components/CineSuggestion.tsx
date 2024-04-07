import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

interface boxofficeListProps {
  movieId?: string | number;
  rank?: string | number;
  movieTitle?: string;
  nation?: string;
  productionYear?: string | number;
  runningTime?: string | number;
}

interface movieListCarousel {
  title: string;
  list: Array<boxofficeListProps>;
}

function CineSuggestion({ title, list }: movieListCarousel) {
  let slideIndex = 0;

  const slideWrap = useRef<HTMLUListElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      {title !== 'none' && (
        <h3>
          {title === 'boxoffice'
            ? '박스오피스 순위'
            : title === 'starRating'
              ? '평균별점이 높은 작품'
              : title === 'individual'
                ? '개인별 추천작'
                : ''}
        </h3>
      )}
      <div className="slide-container">
        <ul ref={slideWrap}>
          {list.map((v: any, i: any) => (
            <li key={i}>
              <Link to={`/detail/${v.movieId}`}>
                {title !== 'none' && <p className="ranking">{v.rank}</p>}
                {/* <img src={v.mainImg} alt={v.movieNm} /> */}
                {title !== 'none' ? (
                  <div className="movie-info">
                    <p className="movie-title">{v.movieTitle}</p>
                    <p>{v.productionYear}</p>
                    <p>
                      {v.nation} {v.runningTime}분
                    </p>
                  </div>
                ) : (
                  <div className="movie-info">
                    <p className="movie-title">{v.movieNm}</p>
                    <p>평가함 ★ {v.rating}</p>
                  </div>
                )}
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
        <img src="../images/prev_button.png" alt="prev" />
      </button>
      <button
        type="button"
        onClick={slideNext}
        ref={nextRef}
        className={`next-btn`}
      >
        <img src="../images/next_button.png" alt="next" />
      </button>
    </>
  );

  function slidePrev() {
    if (!slideWrap.current || !prevRef.current || !nextRef.current) {
      console.error('Error: One or more refs are null.');
      return;
    }
    if (slideIndex === 0) return;
    slideIndex -= 1;
    slideWrap.current.style.transform = `translate(calc(-100% * ${slideIndex}))`;
    prevRef.current.style.display = 'none';
    nextRef.current.style.display = 'block';
  }

  function slideNext() {
    if (!slideWrap.current || !prevRef.current || !nextRef.current) {
      console.error('Error: One or more refs are null.');
      return;
    }
    if (slideIndex === 1) return;
    slideIndex += 1;
    slideWrap.current.style.transform = `translate(calc(-100% - 16px * ${slideIndex}))`;
    nextRef.current.style.display = 'none';
    prevRef.current.style.display = 'block';
  }
}

export default CineSuggestion;
