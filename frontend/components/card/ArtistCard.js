import React from 'react';
import './Card.css';


function ArtistCard(props) {
    const artistName = props.artistName || ArtistCard.defaultProps.artistName;
    const img = props.img || ArtistCard.defaultProps.img;


    return (
        <div className = 'card'>
            <img className = 'result-image' src={img} alt = {artistName} />
            <h1 className = 'card-title'> {artistName}</h1>
        </div>
    )
}

ArtistCard.defaultProps = {
     img: 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg',
     artistName: 'No top artist!'
}


export default ArtistCard;