import React from 'react';

const ArtistCard = ({ artist }) => {
  return (
    <div className="artist-card-wrapper">
      <span className="artist-img-wrapper">
        <img className="artist-img" src={artist.images[1].url}></img>
      </span>
      <span className="artist-name-wrapper">
        <h2 className="artist-name">{artist.name}</h2>
      </span>
    </div>
  );
};

export default ArtistCard;
