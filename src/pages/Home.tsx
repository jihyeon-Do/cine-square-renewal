import React, { useEffect, useState, useCallback, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../redux/modules';

import './home.scss';

import HeaderTemplate from '../components/HeaderTemplate';
import FooterTemplate from '../components/FooterTemplate';
// import VideoFrame from '../components/VideoFrame';
import Owlslide from '../components/Owlslide';
import VideoFrameContainer from '../containers/VideoFrameContainer';
import CineSuggestion from '../components/CineSuggestion';
// import { startGetBoxOfficeListActionCreator } from '../redux/modules/boxoffice';
// import BoxOffice from '../components/BoxOffice';
// import TokenService from '../service/TokenService';
// import AccountService from '../service/AccountService';
// import CineSuggestion from '../components/CineSuggestion';
// import AverageRanking from '../components/AverageRanking';

function Home() {
  // const dispatch = useDispatch();
  // const boxOfficeList = useSelector((state: RootState) => {
  //   console.log(state);
  //   return state.boxoffice.boxOfficeList;
  // });
  const [modalId, setModalId] = useState(0);
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
            <CineSuggestion title={'boxoffice'} />
          </article>
          <article className="rank cine-square-rank">
            <CineSuggestion title={'starRating'} />
          </article>
          <article className="rank cine-square-rank">
            <CineSuggestion title={'individual'} />
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
