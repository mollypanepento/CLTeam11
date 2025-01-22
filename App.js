import logo from './logo.svg';
import './App.css';
import React from 'react';
import Login from './pages/login/Login';
import Info from './pages/userinfo/Info';
import Results from './pages/results/Results';
import Top from './components/top/Top';
import TerpTunesLogo from './assets/images/TerpTunesLogo.png';
import TopAlbums from './components/albumList/TopAlbums';
import { Link,BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path="/info" element={<Info />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </BrowserRouter>

      </div>
      {/* /* <br />
    <div>
      <Login />
    </div>

    <div>
      <Info />
    </div> */}
    </>
  );
}


export default App;
