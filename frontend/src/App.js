import logo from './logo.svg';
import './App.css';
import React from 'react';
import Login from '../src/pages/Login';
import Info from '../src/pages/Info';
import Results from '../src/pages/Results';
import Top from '../src/components/Top';
import TerpTunesLogo from './assets/images/TerpTunesLogo.png';
import TopAlbums from '../src/components/TopAlbums';
import { Link,BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    
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
     

  );
}


export default App
