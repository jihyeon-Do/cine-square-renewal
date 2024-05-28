import { useRef, useEffect } from 'react';

type IntersectionObserverCallback = (entry: any) => void;

export default function useIntersectionObserver(
  //: callback 함수
  callback: IntersectionObserverCallback,
) {
  const observer = useRef<IntersectionObserver | null>(null);
  let trigger = false;
  //: 관찰자 초기화
  useEffect(() => {
    observer.current = new IntersectionObserver(
      //: observerInstance : 콜백이 실행되는 해당 인스턴스를 참조합니다.
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && trigger) {
            //: callback 함수 실행
            callback(entry);
            observerInstance.unobserve(entry.target);
            trigger = false;
          } else {
            trigger = true;
          }
        });
      },
      { threshold: 1 },
    );

    return () => {
      if (observer.current) {
        //: observer가 관찰하는 모든 요소의 관찰을 중지
        observer.current.disconnect();
      }
    };
  }, [callback]);

  //: 관찰할 대상 등록
  const observe = (element: Element | null) => {
    if (observer.current && element) {
      observer.current.observe(element);
    }
  };

  //: 대상 요소 관찰 중지
  const unobserve = (element: Element | null) => {
    if (observer.current && element) {
      observer.current.unobserve(element);
    }
  };

  return { observe, unobserve };
}
