import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoNoWords from '../assets/images/LogoNoWords.png';
import './Login.css';
import { loginWithSpotifyClick } from './token.js';
import { getToken } from './token.js';
import { currentToken } from './token.js';
import { getUserData } from './token.js';
import { Link } from 'react-router-dom';

const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
  
    useEffect(() => {
      const handleLogin = async () => {
        const args = new URLSearchParams(window.location.search);
        const code = args.get("code");
  
        if (code) {
          const token = await getToken(code);
          currentToken.save(token);
  
          // Remove code from URL
          const url = new URL(window.location.href);
          url.searchParams.delete("code");
          const updatedUrl = url.search ? url.href : url.href.replace("?", "");
          window.history.replaceState({}, document.title, updatedUrl);
        }
  
        if (currentToken.access_token) {
          setIsLoggedIn(true);
          const fetchedUserData = await getUserData();
          setUserData(fetchedUserData);
        }
      };
  
      handleLogin();
    }, []);
  
        return (
            <div className="LoginPage">
              <img src={LogoNoWords} id="logo" alt="TerpTunesLogo" />
              <h1 className="title">
                <span>Terp</span>Tunes
              </h1>
              <br />
              <p className="description">
                Compare your music taste with the campus around you!
              </p>
              <br />
              <button
                className="btn btn-primary"
                id="loginButton"
                onClick={loginWithSpotifyClick}
              >
                <span>Login with Spotify &nbsp; &nbsp;</span>
                <img
                  id="SpotifyLogo"
                  src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/spotify-white-icon.png"
                  alt="Spotify"
                />
              </button>
              
              <br />
              <Link to="/Info">Link to info page</Link>
            </div>
          );
  
    
  };
  
  export default Login;
  
