import React, { useCallback, useEffect, useRef } from 'react';
import useIntersectionObserver from '../hook/Observer';

interface SetPage {
  setPage: any;
}

export default function Test({ setPage }: SetPage) {
  const elementRef = useRef<HTMLDivElement | null>(null);

  //: callback 함수
  const callback = useCallback(() => {
    setPage((prevPage: number) => prevPage + 1);
  }, []);
  //: intersectioin observer custom hook
  const { observe, unobserve } = useIntersectionObserver(callback);

  useEffect(() => {
    if (elementRef.current) {
      observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        unobserve(elementRef.current);
      }
    };
  }, [observe, unobserve]);

  return (
    <div
      ref={elementRef}
      style={{ height: '1px', backgroundColor: 'transparent' }}
    ></div>
  );
}
