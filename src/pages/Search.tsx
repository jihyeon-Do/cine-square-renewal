import React, { useEffect } from 'react';
import './search.scss';
import { Link } from 'react-router-dom';
import HeaderTemplate from '../components/HeaderTemplate';
import FooterTemplate from '../components/FooterTemplate';

type searchListType =
  | {
      id: number;
      movieCd: string;
      movieNm: string;
      openDt: string;
      nations: string;
      showTm: string;
      mainImg: string;
    }[]
  | null;

export default function Search({ match }: any) {
  const searchWord = 'test';
  const searchLists: searchListType = [
    {
      id: 9,
      movieCd: '142691',
      movieNm: '왓츠 러브',
      openDt: '2024.03.20',
      nations: '영국',
      showTm: '109',
      mainImg: '../images/boxoffice9.jpeg',
    },
  ];
  return (
    <>
      <HeaderTemplate />
      <main className="search-main">
        <section>
          <div className="search-results">
            <p>
              <span>{`'${searchWord}'`}</span>(으)로 검색한 결과입니다.
            </p>
          </div>
          <div className="search-results-list">
            <h2>검색결과</h2>
            {searchLists.length === 0 ? (
              <p>일치하는 검색 결과가 없습니다.</p>
            ) : (
              <ul>
                {searchLists.map((list, index) => (
                  <li key={index}>
                    <Link to={`/detail/${list.movieCd}`}>
                      <img src={`${list.mainImg}`} alt={`${list.movieNm}`} />
                      <span>{list.movieNm}</span>
                      <span>
                        {list.openDt} <span>{list.nations}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
      <FooterTemplate />
    </>
  );
}
