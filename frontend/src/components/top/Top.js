import React from 'react';
import TerpTunesLogo from '../../assets/images/TerpTunesLogo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Top.css';


export default function Top() {
    return (
        <div>
            <img src={TerpTunesLogo} className='logo' alt="TT" />

            <a className='btn btn-primary' id='logoutButton' as="a" href = 'https://open.spotify.com/'> 
            Log Out
            </a> 

        </div>
        
    )

}