import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import noImg from '../images/no-image.png';

interface MovieListProps {
  movie_id?: string | number;
  title?: string;
  nation?: string;
  production_year?: number;
  running_time?: number;
  score?: number | null;
  thumbnail?: string | null;
}

interface CommonMovieList {
  movie: MovieListProps;
  rank?: string | number;
}

interface movieListCarousel {
  title: string;
  list: Array<CommonMovieList>;
}

function CineSuggestion({ title, list }: movieListCarousel) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // let slideIndex = 0;

  const slideWrap = useRef<HTMLUListElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const ref = useRef(null);
  const slideIndex = useRef(0);
  let trigger = false;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trigger = true;
          } else {
            trigger = false;
          }
        });
      },
      { threshold: 0.3 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        //: observer가 관찰하는 모든 요소의 관찰을 중지
        observer.unobserve(ref.current);
      }
    };
  }, [windowWidth]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    let resizeTimeout: string | number | NodeJS.Timeout | undefined;

    const debouncedResizeHandler = () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }

      resizeTimeout = setTimeout(handleResize, 200);
    };

    window.addEventListener('resize', debouncedResizeHandler);

    return () => {
      window.removeEventListener('resize', debouncedResizeHandler);
    };
  }, []);

  useEffect(() => {
    if (windowWidth >= 601) {
      if (slideIndex.current >= 2) {
        slideIndex.current = 1;
        if (slideWrap.current) {
          slideWrap.current.style.transform = `translate(calc(-100% * ${slideIndex.current}))`;
        }
      }
    }
  }, [windowWidth]);

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
          {list.length !== 0 &&
            list.map((v: any, i: number) => (
              <li key={i}>
                <Link to={`/detail/${v.movie.movie_id}`}>
                  {title !== 'none' && <p className="ranking">{v.rank}</p>}
                  <div className="thumbnail-container">
                    <div className="thumbnail-wrapper">
                      <img
                        src={
                          v.movie.thumbnail === null ? noImg : v.movie.thumbnail
                        }
                        alt={v.movie.movie_id}
                      />
                    </div>
                  </div>

                  {title !== 'none' ? (
                    <div className="movie-info">
                      <p className="movie-title">{v.movie.title}</p>
                      <p>{v.movie.production_year}</p>
                      <p>
                        {v.movie.nation} {v.movie.running_time}분
                      </p>
                    </div>
                  ) : (
                    <div className="movie-info">
                      <p className="movie-title">{v.movie.movie_id}</p>
                      <p>평가함 ★ {v.movie.score}</p>
                    </div>
                  )}
                </Link>
              </li>
            ))}
          <div className="observer" ref={ref} style={{ height: '1px' }}></div>
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
    if (slideIndex.current === 0) return;
    slideIndex.current = slideIndex.current - 1;
    slideWrap.current.style.transform = `translate(calc(-100% * ${slideIndex.current}))`;
    nextRef.current.style.display = 'block';
  }

  function slideNext() {
    if (!slideWrap.current || !prevRef.current || !nextRef.current) {
      console.error('Error: One or more refs are null.');
      return;
    }
    if (trigger) return;
    slideIndex.current = slideIndex.current + 1;
    slideWrap.current.style.transform = `translate(calc(-100% * ${slideIndex.current}))`;
    prevRef.current.style.display = 'block';
  }
}

export default CineSuggestion;
