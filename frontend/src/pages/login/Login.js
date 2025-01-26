import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoNoWords from '../../assets/images/LogoNoWords.png';
import './Login.css';
import { Link } from 'react-router-dom';

function Login() {

    return (

        <div className='LoginPage'>

            <img src={LogoNoWords} id='logo' alt="TerpTunesLogo" />
            <h1><span>Terp</span>Tunes</h1>
            <br></br>
            <p className='description'>Compare your music taste with the campus around you!</p>
            <br></br>
            <a className="btn btn-primary" id="loginButton" href='https://open.spotify.com/'>
                <span>Login with Spotify &nbsp; &nbsp;</span>
                <img id="SpotifyLogo" src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/spotify-white-icon.png" />
            </a>
            <br></br>
            <Link to= '/Info'> link to info page </Link>
        </div>

    );
}

export default Login;
