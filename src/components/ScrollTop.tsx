import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 타이머를 사용하여 딜레이를 줍니다
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    });

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
  }, [pathname]);

  return null;
}
