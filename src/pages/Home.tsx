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
  movie_id?: number;
  nation?: string;
  production_year?: number;
  running_time?: number;
  score?: number | null;
  thumbnail?: string | null;
  title?: string;
};

interface SimpleMoiveInfos {
  movie: SimpleMoiveInfo;
  rank: number;
}

function Home() {
  // const dispatch = useDispatch();
  // const boxOfficeList = useSelector((state: RootState) => {
  //   console.log(state);
  //   return state.boxoffice.boxOfficeList;
  // });
  const [modalId, setModalId] = useState(0);
  const [boxofficeArray, setBoxofficeArray] = useState<SimpleMoiveInfos[]>([]);
  const [averageRatingArray, setAverageRatingArray] = useState<
    SimpleMoiveInfos[]
  >([]);
  const [individualArray, setIndividualArray] = useState<SimpleMoiveInfos[]>(
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
    // const today = getToday();
    async function getMovieInfo() {
      try {
        const response = await axios.get(
          `${LOCALAPI}/api/movies/boxoffice?request_date=${20240423}`,
        );
        setBoxofficeArray(response.data.list);
      } catch (error) {
        console.log(error);
      }
    }
    getMovieInfo();
  }, []);

  //: 평균별점 높은 순위
  useEffect(() => {
    async function getAverageRatingMovie() {
      try {
        const response = await axios.get(
          `${LOCALAPI}/api/movies/cinesquare-ranking`,
        );
        setAverageRatingArray(response.data.list);
      } catch (error) {
        console.log(error);
      }
    }
    getAverageRatingMovie();
  }, []);

  //: 개인별 추천 순위
  useEffect(() => {
    setIndividualArray(individualList);
  }, []);

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
            <CineSuggestion title={'boxoffice'} list={boxofficeArray} />
          </article>
          <article className="rank cine-square-rank">
            <CineSuggestion title={'starRating'} list={averageRatingArray} />
          </article>
          <article className="rank cine-square-rank">
            <CineSuggestion title={'individual'} list={individualArray} />
          </article>
        </section>
      </main>
      <FooterTemplate />
    </>
  );
}

export default React.memo(Home);
