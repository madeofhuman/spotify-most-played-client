import React from 'react';

const TrackCard = ({ track, index }) => {
  return (
    <div className="track-card-wrapper">
      <span className="track-list-id">{index}</span>
      <img className="track-art" src={track.album.images[1].url}></img>
      <div className="track-title-artist-wrapper">
        <span className="track-title dark-text-shadow">{track.name}</span>
        <span className="track-artist dark-text-shadow">{track.artists[0].name}</span>
      </div>
    </div>
  );
};

export default TrackCard;
