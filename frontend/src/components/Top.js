import React from 'react';
import TerpTunesLogo from '../assets/images/TerpTunesLogo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Top.css';
import { logoutClick } from './logout.js'


export default function Top() {
    return (
        <div>
            <img src={TerpTunesLogo} className='logo' alt="TT" />

            <button className='btn btn-primary' id='logoutButton' onClick={logoutClick}> 
            Log Out
            </button> 

        </div>
        
    )

}