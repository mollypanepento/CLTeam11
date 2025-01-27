import React from 'react'
import Top from '../components/Top';
import TopAlbums from '../components/TopAlbums';
import TopArtists from '../components/TopArtists';
import Percentage from '../components/Percentage';
import './Results.css';


function Results() {
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
    )
}

export default Results;