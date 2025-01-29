import React from 'react';
import ArtistCard from './ArtistCard.js';
import './TopArtists.css';

const one = (
    <ArtistCard />
)

const two = (
    <ArtistCard />
)

const three = (
    <ArtistCard />
)

const four = (
    <ArtistCard />
)

const five = (
    <ArtistCard />
)

const six = (
    <ArtistCard />
)

const seven = (
    <ArtistCard />
)

const eight = (
    <ArtistCard />
)

const nine = (
    <ArtistCard />
)

const ten = (
    <ArtistCard />
)



function TopArtists() {
    return (
        <div>
            <h2 className='school-results'>Your Community's Top Artists </h2>
            <br></br>
            <div className='artist-list'>
                {one}
                {two}
                {three}
                {four}
                {five}
                {six}
                {seven}
                {eight}
                {nine}
                {ten}
            </div>
        </div>
    )
}

export default TopArtists;