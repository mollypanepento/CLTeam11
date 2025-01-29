import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { currentToken } from './token';
import Top from '../components/Top';
import TopAlbums from '../components/TopAlbums';
import TopArtists from '../components/TopArtists';
import Percentage from '../components/Percentage';
import './Results.css';

function Results() {
  const [userData, setUserData] = useState(null);

  // Fetch user data from the backend API
  useEffect(() => {
    fetch('http://localhost:3000/api/user-data')
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);


  return (
    <div>
            <Top />
            <br></br>
            <Percentage />
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <TopAlbums />
            <br></br>
            <br></br>
            <br></br>
            <TopArtists />

        </div>
  );
}

export default Results;