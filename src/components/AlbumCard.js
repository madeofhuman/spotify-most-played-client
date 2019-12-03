import React from 'react';

const AlbumCard = ({ album, index }) => {
  return (
    <div className="album-card-wrapper">
      <img className="album-art" src={album.image}></img>
      <span className="album-list-id">{index}</span>
      <div className="album-footer">
        <span className="album-title dark-text-shadow">{album.title}</span>
        <span className="album-artist dark-text-shadow">{album.artist}</span>
      </div>
    </div>
  );
};

export default AlbumCard;
