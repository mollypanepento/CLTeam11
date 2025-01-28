import logo from './logo.svg';
import './App.css';
import React from 'react';
import Login from './pages/Login';
import Info from './pages/Info';
import SpotifyRedirect from '../../../frontend/src/pages/SpotifyRedirect';
import Results from './pages/Results';
import Top from './components/Top';
import TerpTunesLogo from './assets/images/TerpTunesLogo.png';
import TopAlbums from './components/TopAlbums';
import { Link,BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';


function App() {
  return (
    
      <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path="/info" element={<Info />} />
            <Route path="/redirect" element={<SpotifyRedirect />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </BrowserRouter>

      </div>
     

  );
}


export default App
