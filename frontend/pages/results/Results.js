import React from 'react'
import Top from '../../components/top/Top';
import TopAlbums from '../../components/albumList/TopAlbums';
import TopArtists from '../../components/artistList/TopArtists';
import Percentage from '../../components/percentage/Percentage';
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