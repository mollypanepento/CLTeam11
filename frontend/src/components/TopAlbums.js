import React from 'react';
import TrackCard from './TrackCard';
import './TopAlbums.css';
//use props!

const one = (
    <TrackCard 
        // albumName=
        // artistName =
        // img = 
         />
)

const two = (
    <TrackCard/>
)

const three = (
    <TrackCard/>
)

const four = (
    <TrackCard/>
)

const five = (
    <TrackCard/>
)

const six = (
    <TrackCard/>
)

const seven = (
    <TrackCard/>
)

const eight = (
    <TrackCard/>
)

const nine = (
    <TrackCard/>
)

const ten = (
    <TrackCard/>
)




function TopAlbums() {
    return (
        <div>
            <h2 className = 'school-results'>Your Community's Top Tracks </h2>
            <br></br>
            <div className = 'track-list'>
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

export default TopAlbums;