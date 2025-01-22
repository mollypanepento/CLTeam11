import React from 'react';
import TrackCard from '../card/TrackCard';
import './TopAlbums.css';
//use props!

const firstTrack = (
    <TrackCard />
)

const secondTrack = (
    <TrackCard/>
)

const thirdTrack = (
    <TrackCard/>
)

function TopAlbums() {
    return (
        <div>
            <h2 className = 'school-results'>Your Community's Top Tracks </h2>
            <br></br>
            <div className = 'track-list'>
            {firstTrack}
            {secondTrack}
            {thirdTrack}
            </div>
        </div>
    )
}

export default TopAlbums;