import React, { useEffect, useState, useCallback, useRef } from 'react';
import { starRating, individualList } from '../data/CineSuggestionMovieList';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../redux/modules';

import './home.scss';

import HeaderTemplate from '../components/HeaderTemplate';
import FooterTemplate from '../components/FooterTemplate';
// import VideoFrame from '../components/VideoFrame';
import Owlslide from '../components/Owlslide';
import VideoFrameContainer from '../containers/VideoFrameContainer';
import CineSuggestion from '../components/CineSuggestion';
import axios from 'axios';
// import { startGetBoxOfficeListActionCreator } from '../redux/modules/boxoffice';
// import BoxOffice from '../components/BoxOffice';
// import TokenService from '../service/TokenService';
// import AccountService from '../service/AccountService';
// import CineSuggestion from '../components/CineSuggestion';
// import AverageRanking from '../components/AverageRanking';

type SimpleMoiveInfo = {
  movieId?: number;
  rank?: number;
  movieTitle?: string;
  nation?: string;
  productionYear?: number;
  runningTime?: number;
};

function Home() {
  // const dispatch = useDispatch();
  // const boxOfficeList = useSelector((state: RootState) => {
  //   console.log(state);
  //   return state.boxoffice.boxOfficeList;
  // });
  const [modalId, setModalId] = useState(0);
  const [boxofficeList, setBoxofficeList] = useState<SimpleMoiveInfo[]>([]);
  const [averageRatingList, setAverageRatingList] = useState<SimpleMoiveInfo[]>(
    [],
  );
  const LOCALAPI = 'http://3.38.64.130:8080';
  // const token = useSelector((state: RootState) => state.auth.token);
  // const account = useSelector((state) => state.auth.account);
  // const userName = useSelector((state) => state.auth.userName);

  // if (token && account) {
  //   TokenService.save(token);
  //   AccountService.save(account, userName);
  // }

  const show = (id: number) => {
    setModalId(id);
  };

  const hide = () => {
    setModalId(0);
  };

  const getToday = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return year + month + day;
  };

  //: 박스오피스
  useEffect(() => {
    const today = getToday();
    async function getMovieInfo() {
      try {
        const response = await axios.get(
          `${LOCALAPI}/api/movies/boxoffice?request_date=${'20240328'}`,
        );
        let boxofficeArray: SimpleMoiveInfo[] = [];
        response.data.list.map(
          (v: { movie_id: number; rank: number }, i: number) => {
            boxofficeArray = [
              ...boxofficeArray,
              { movieId: v.movie_id, rank: v.rank },
            ];
          },
        );
        boxofficeDetail(boxofficeArray);
      } catch (error) {
        console.log(error);
      }
    }
    getMovieInfo();
  }, []);

  async function boxofficeDetail(boxofficeArray: SimpleMoiveInfo[]) {
    let copyBoxofficeList: SimpleMoiveInfo[] = [];
    try {
      await Promise.all(
        boxofficeArray.map(async (v, i) => {
          const boxofficeListDetail = await axios.get(
            `${LOCALAPI}/api/movies/${v.movieId}`,
          );
          copyBoxofficeList = [
            ...copyBoxofficeList,
            {
              rank: v.rank,
              movieId: v.movieId,
              movieTitle: boxofficeListDetail.data.data.movie_title,
              nation: boxofficeListDetail.data.data.nation,
              productionYear: boxofficeListDetail.data.data.production_year,
              runningTime: boxofficeListDetail.data.data.running_time,
            },
          ];
        }),
      );
    } catch (error) {
      console.log(error);
    }

    //* sort 메서드의 비교 함수는 반드시 숫자를 반환해야 하며, undefined이나 다른 타입을 반환하면 타입 에러가 발생할 수 있습니다.
    copyBoxofficeList = copyBoxofficeList.sort((a, b) => {
      if (a.rank !== undefined && b.rank !== undefined) {
        return a.rank - b.rank;
      }
      return 0;
    });
    setBoxofficeList(copyBoxofficeList);
  }

  useEffect(() => {
    async function getAverageRatingMovie() {
      try {
        const response = await axios.get(
          `${LOCALAPI}/api/movies/cinesquare-ranking`,
        );
        let averageRatingArray: SimpleMoiveInfo[] = [];
        response.data.list.map(
          (v: { movie_id: number; rank: number }, i: number) => {
            averageRatingArray = [
              ...averageRatingArray,
              { movieId: v.movie_id, rank: v.rank },
            ];
          },
        );
        averageRatingDetail(averageRatingArray);
      } catch (error) {
        console.log(error);
      }
    }
    getAverageRatingMovie();
  }, []);

  async function averageRatingDetail(averageRatingArray: SimpleMoiveInfo[]) {
    let copyAverageRatingList: SimpleMoiveInfo[] = [];
    try {
      await Promise.all(
        averageRatingArray.map(async (v, i) => {
          const averageRatingListDetail = await axios.get(
            `${LOCALAPI}/api/movies/${v.movieId}/simple`,
          );
          copyAverageRatingList = [
            ...copyAverageRatingList,
            {
              rank: v.rank,
              movieId: v.movieId,
              movieTitle: averageRatingListDetail.data.data.movie_title,
              nation: averageRatingListDetail.data.data.nation,
              productionYear: averageRatingListDetail.data.data.production_year,
              runningTime: averageRatingListDetail.data.data.running_time,
            },
          ];
        }),
      );
    } catch (error) {
      console.log(error);
    }

    //* sort 메서드의 비교 함수는 반드시 숫자를 반환해야 하며, undefined이나 다른 타입을 반환하면 타입 에러가 발생할 수 있습니다.
    copyAverageRatingList = copyAverageRatingList.sort((a, b) => {
      if (a.rank !== undefined && b.rank !== undefined) {
        return a.rank - b.rank;
      }
      return 0;
    });
    setAverageRatingList(copyAverageRatingList);
  }

  // const getBoxOfficeList = useCallback(() => {
  //   dispatch(startGetBoxOfficeListActionCreator());
  // }, [dispatch]);

  // useEffect(() => {
  //   getBoxOfficeList();
  // }, [getBoxOfficeList]);

  return (
    <>
      <HeaderTemplate />
      <main className="home-main">
        <h2 className="a11y-hidden">메인페이지</h2>
        <Owlslide show={show} modalId={modalId} />
        {modalId > 0 && <VideoFrameContainer hide={hide} id={modalId} />}
        <section>
          <article className="rank cine-square-rank">
            <CineSuggestion title={'boxoffice'} list={boxofficeList} />
          </article>
          <article className="rank cine-square-rank">
            <CineSuggestion title={'starRating'} list={averageRatingList} />
          </article>
          <article className="rank cine-square-rank">
            <CineSuggestion title={'individual'} list={individualList} />
          </article>
        </section>
      </main>

      {/* <main className="home-main">
        <h2 className="a11y-hidden">메인페이지</h2>
        <Owlslide show={show} />
        {modalId > 0 && <VideoFrameContainer hide={hide} id={modalId} />}
        <section>
          <article className="rank cine-square-rank">
            <CineSuggestion />
          </article>

          <article className="rank box-office-rank">
            <h3>박스오피스 순위</h3>
            <BoxOffice boxOfficeList={boxOfficeList} />
          </article>

          <article className="rank highly-rated-rank">
            <h3>평균 별점 높은 순위</h3>
            <AverageRanking />
          </article> */}
      {/* <article className="my-collection-wrapper">
            <div className="my-collection">
              <h3>마이컬렉션</h3>
              <ul>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <div></div>
            </div>
          </article> */}
      {/* </section>
      </main> */}
      <FooterTemplate />
    </>
  );
}

export default React.memo(Home);
