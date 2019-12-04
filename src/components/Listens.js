import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { fetchListens } from '../services';
import ListensContext from '../providers/ListensContext';
import ArtistsList from './ArtistsList';
import AlbumsList from './AlbumsList';
import TracksList from './TracksList';

const Listens = () => {
  useEffect(() => {
    getListens();
  }, []);

  const [ artists, setArtists ] = useState({});
  const [ tracks, setTracks ] = useState({});
  const [ loading, setLoading ] = useState(false);
  const [ renderTab, setRenderTab ] = useState('artists');

  const getListens = async () => {
    setLoading(true);
    const accessToken = Cookies.get('_sp_access_token');
    const { ok, data } = await fetchListens(accessToken);
    if (ok) {
      setArtists(data.artists);
      setTracks(data.tracks);
      setLoading(false);
    }
  };

  const handleTabSwap = (event) => {
    const tabs = document.getElementsByClassName('tab');
    [...tabs].forEach(tab => {
      tab.innerHTML = tab.innerHTML.toLowerCase();
      tab.className = "tab"
    });
    event.target.innerHTML = event.target.innerHTML.toUpperCase();
    event.target.className = "tab active-tab";
    setRenderTab(event.target.innerHTML.toLowerCase());
  };

  const renderTabs = (activeTab) => {
    switch (activeTab) {
      case 'artists':
        return <ArtistsList />;
      case 'albums':
        return <AlbumsList />
      case 'tracks':
        return <TracksList />
      default:
        break;
    }
  };

  return (
    <React.Fragment>
      {loading
        ? <h4>Loading...</h4>
        : <div>
            <ListensContext.Provider value={{ artists, tracks }}>
              <div className="tabs-wrapper">
                <span className={"tab active-tab"} onClick={handleTabSwap}>ARTISTS</span>
                <span className={"tab"} onClick={handleTabSwap}>albums</span>
                <span className={"tab"} onClick={handleTabSwap}>tracks</span>
              </div>
              <div>
                {renderTabs(renderTab)}
              </div>
            </ListensContext.Provider>
          </div>
      }
    </React.Fragment>
  );
};

export default Listens;
