import React from 'react';
import './Card.css';


function TrackCard(props) {
    const albumName = props.albumName || TrackCard.defaultProps.albumName;
    const artistName = props.artistName || TrackCard.defaultProps.artistName;
    const img = props.img || TrackCard.defaultProps.img;
    //use props to update photo/name of artist or track


    return (
        <div className = 'card'>
            <img className = 'result-image' src={img} alt = {{albumName}} />
            <h1 className = 'card-title'> {albumName}</h1>
            <h2 className = 'artist-name'>{artistName}</h2>
        </div>
    )
}

TrackCard.defaultProps = {
     img: 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg',
     albumName: 'No top tracks!',
     artistName: 'No top tracks!'
}


export default TrackCard;