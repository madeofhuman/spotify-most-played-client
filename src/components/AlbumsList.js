import React, { useContext } from 'react';
import ListensContext from '../providers/ListensContext';
import AlbumCard from './AlbumCard';

const serializeAlbums = (tracks) => {
  const albums = tracks.medium_term.items.map(track => track.album);
  const serializedAlbums = [];
  const map = new Map();
  for (const album of albums) {
    if (!map.has(album.id)) {
      map.set(album.id, true);
      serializedAlbums.push({
        id: album.id,
        artist: album.artists[0].name,
        image: album.images[1].url,
        title: album.name,
      });
    }
  }
  return serializedAlbums;
}

const AlbumsList = () => {
  const { tracks } = useContext(ListensContext);
  const serializedAlbums = serializeAlbums(tracks);
  return (
    <div>
      <h3 className="tab-title">These were your most-played albums in the last year</h3>
      <div className="albumlist-wrapper">
        {serializedAlbums && serializedAlbums.length
          ? serializedAlbums.map((album, i) => <AlbumCard key={album.id} album={album} index={i+1} />)
          : null
        }
      </div>
    </div>
  );
};

export default AlbumsList;

