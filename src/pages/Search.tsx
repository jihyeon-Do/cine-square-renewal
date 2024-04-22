import React, { useEffect, useState } from 'react';
import './search.scss';
import { Link, useParams } from 'react-router-dom';
import HeaderTemplate from '../components/HeaderTemplate';
import FooterTemplate from '../components/FooterTemplate';
import axios from 'axios';
import APIService from '../service/APIService';
import noImg from '../images/no-images.png';

type searchListType = {
  movie_id: number;
  title: string;
  production_year: number;
  nation: string;
  running_time: number;
  thumbnail: string;
}[];

export default function Search() {
  const [searchList, setSearchList] = useState<searchListType>([]);
  const { keyword } = useParams();
  const LOCALAPI = APIService.LOCALAPI;
  // const searchLists: searchListType = [
  //   {
  //     id: 9,
  //     movie_id: '142691',
  //     movie_title: '왓츠 러브',
  //     production_year: '2024.03.20',
  //     nation: '영국',
  //     showTm: '109',
  //     mainImg: '../images/boxoffice9.jpeg',
  //   },
  // ];
  useEffect(() => {
    async function getSearchList() {
      try {
        console.log(keyword);
        const response = await axios.get(
          `${LOCALAPI}/api/movies?title=${keyword}`,
        );
        setSearchList(response.data.list);
      } catch (error) {
        console.log(error);
      }
    }
    getSearchList();
  }, [keyword]);

  return (
    <>
      <HeaderTemplate />
      <main className="search-main">
        <section className="search-section">
          <div className="search-results">
            <p>
              <span>{`'${keyword}'`}</span>(으)로 검색한 결과입니다.
            </p>
          </div>
          <div className="search-results-list">
            <h2>검색결과</h2>
            {searchList.length === 0 ? (
              <p>일치하는 검색 결과가 없습니다.</p>
            ) : (
              <ul>
                {searchList.map((list, index) => (
                  <li key={index}>
                    <Link to={`/detail/${list.movie_id}`}>
                      {/* <img src={`${list.mainImg}`} alt={`${list.movie_title}`} /> */}
                      <img src={list.thumbnail} alt={`${list.title}`} />
                      <span>{list.title}</span>
                      <span>
                        {list.production_year} <span>{list.nation}</span>
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
