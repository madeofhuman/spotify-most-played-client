import React, { useContext } from 'react';
import ListensContext from '../providers/ListensContext';
import ProfileContext from '../providers/ProfileContext';
import TrackCard from './TrackCard';

const TracksList = () => {
  const { tracks } = useContext(ListensContext);
  const username = useContext(ProfileContext);
  return (
    <div>
      <h3 className="tab-title">{username}, these were your favourite songs of the past year</h3>
      {tracks && tracks.medium_term && tracks.medium_term.items && tracks.medium_term.items.length
        ? tracks.medium_term.items.map((track, i) => <TrackCard key={track.id} track={track} index={i+1} />)
        : null
      }
    </div>
  );
};

export default TracksList;
