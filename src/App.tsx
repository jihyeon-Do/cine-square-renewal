import React from 'react';
import './App.css';
import Login from './pages/Login';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
// import FatalError from './pages/FatalError';
// import Signin from './pages/Signin';
// import Complete from './pages/Complete';
// import Search from './pages/Search';
// import NotFound from './pages/NotFound';
// import Signup from './pages/Signup';
// import Detail from './pages/Detail';
// import Profile from './pages/Profile';
// // import Evaluate from './pages/Evaluate';
// import MyBooks from './pages/MyBooks';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path={'/signin'} element={<Signin />} /> */}
        {/* <Route path={'/signup'} element={<Signup />} /> */}
        {/* <Route path={'/complete'} element={<Complete />} /> */}
        {/* <Route path={'/profile'} element={<Profile />} /> */}
        {/* <Route path={'/detail/:movieCd'} element={<Detail />} /> */}
        {/* <Route path="/evaluate" component={Evaluate} /> */}
        {/* <Route path={'/mybooks'} element={<MyBooks />} /> */}
        {/* <Route path={'/search/:keyword'} element={<Search />} /> */}
        <Route path={'/'} element={<Home />} />
        {/* <Route element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;
