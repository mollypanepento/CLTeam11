import React from 'react';
import ArtistCard from '../card/ArtistCard';
import './TopArtists.css';

const firstArtist = (
    <ArtistCard />
)

const secondArtist = (
    <ArtistCard />
)

const thirdArtist = (
    <ArtistCard />
)

function TopArtists() {
    return (
        <div>
            <h2 className='school-results'>Your Community's Top Artists </h2>
            <br></br>
            <div className='artist-list'>
                {firstArtist}
                {secondArtist}
                {thirdArtist}
            </div>
        </div>
    )
}

export default TopArtists;