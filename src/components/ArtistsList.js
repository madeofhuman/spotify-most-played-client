import React, { useContext } from 'react';
import ListensContext from '../providers/ListensContext';
import ProfileContext from '../providers/ProfileContext';
import ArtistCard from './ArtistCard';

const ArtistsList = () => {
  const { artists } = useContext(ListensContext);
  const username = useContext(ProfileContext);
  return (
    <div>
      <h3 className="tab-title">{username}, here are the artists that made your year</h3>
      {artists && artists.medium_term && artists.medium_term.items && artists.medium_term.items.length
        ? artists.medium_term.items.map(artist => <ArtistCard key={artist.id} artist={artist} />)
        : null
      }
    </div>
  );
};

export default ArtistsList;
