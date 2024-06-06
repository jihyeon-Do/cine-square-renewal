import React, { useEffect, useState } from 'react';
import './search.scss';
import { Link, useParams } from 'react-router-dom';
import HeaderTemplate from '../components/HeaderTemplate';
import FooterTemplate from '../components/FooterTemplate';
import axios from 'axios';
import APIService from '../service/APIService';
import noImg from '../images/no-images.png';
import SkeletonElement from '../components/SkeletonElement';
import SearchSkeleton from '../components/skeleton/SearchSkeleton';

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
  const [isFetch, setIsFetch] = useState<boolean>(true);
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
    setIsFetch(true);
    async function getSearchList() {
      try {
        const response = await axios.get(
          `${LOCALAPI}/api/movies?title=${keyword}`,
        );
        setSearchList(response.data.list);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetch(false);
      }
    }
    const searchListAPI = setTimeout(() => {
      getSearchList();
    }, 500);

    return () => {
      clearTimeout(searchListAPI);
    };
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
            <ul>
              {isFetch ? (
                Array.from({ length: 24 }).map((_, index) => (
                  <li key={index} className="thumbnail-skeleton">
                    <SearchSkeleton />
                  </li>
                ))
              ) : searchList.length === 0 ? (
                <p>검색결과가 없습니다.</p>
              ) : (
                searchList.map((list, index) => (
                  <li key={index}>
                    <Link to={`/detail/${list.movie_id}`}>
                      {/* <img src={`${list.mainImg}`} alt={`${list.movie_title}`} /> */}
                      <div className="thumbnail-container">
                        <div className="thumbnail-wrapper">
                          <img
                            src={list.thumbnail ? list.thumbnail : noImg}
                            alt={`${list.title}`}
                          />
                        </div>
                      </div>
                      <span>{list.title}</span>
                      <span>
                        {list.production_year} <span>{list.nation}</span>
                      </span>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>
        </section>
      </main>
      <FooterTemplate />
    </>
  );
}
