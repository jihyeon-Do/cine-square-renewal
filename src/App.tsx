import React, { useEffect } from 'react';
import './App.css';
import Login from './pages/Signin';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

import Home from './pages/Home';
// import FatalError from './pages/FatalError';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
// import Complete from './pages/Complete';
import Search from './pages/Search';
// import NotFound from './pages/NotFound';
import Detail from './pages/Detail';
import Profile from './pages/Profile';

import MyChoice from './pages/MyChoice';
import Evaluation from './pages/Evaluation';
import CommentDetail from './pages/CommentDetail';
import MovieComments from './pages/MovieComments';
import Test from './pages/Test';

function App() {
  function setScreenHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  useEffect(() => {
    setScreenHeight();
    window.addEventListener('resize', setScreenHeight);
    return () => window.removeEventListener('resize', setScreenHeight);
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path={'/signin'} element={<Signin />} />
        <Route path={'/signup'} element={<Signup />} />
        <Route path={'/profile'} element={<Profile />} />
        <Route path={'/detail/:movieId'} element={<Detail />} />
        <Route
          path={'/comment/detail/:commentId'}
          element={<CommentDetail />}
        />
        <Route path={'/mychoice/:listname'} element={<MyChoice />} />
        <Route path={'/review'} element={<MyChoice />} />
        <Route path={'/favorite/review'} element={<MyChoice />} />
        <Route path={'/favorite/person'} element={<MyChoice />} />
        <Route path={'/search/:keyword'} element={<Search />} />
        <Route path={'/:movieId/comments'} element={<MovieComments />} />
        <Route path={'/evaluation'} element={<Evaluation />} />
        <Route path={'/'} element={<Home />} />
        {/* <Route element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;
