import React from 'react';
import './App.css';
import Login from './pages/Signin';
import { Route, Routes } from 'react-router-dom';

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

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/signin'} element={<Signin />} />
        <Route path={'/signup'} element={<Signup />} />
        <Route path={'/profile'} element={<Profile />} />
        <Route path={'/detail/:movieId'} element={<Detail />} />
        <Route path={'/comment/:commentId'} element={<CommentDetail />} />
        <Route path={'/mychoice/:listname'} element={<MyChoice />} />
        <Route path={'/review'} element={<MyChoice />} />
        <Route path={'/favorite/review'} element={<MyChoice />} />
        <Route path={'/favorite/person'} element={<MyChoice />} />
        <Route path={'/search/:keyword'} element={<Search />} />
        <Route path={'/evaluation'} element={<Evaluation />} />
        <Route path={'/'} element={<Home />} />
        {/* <Route element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;
