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

  const [ state, setState ] = useState({
    artists: {},
    tracks: {},
    loading: false,
    renderTab: 'artists'
  });

  const getListens = async () => {
    setState({ ...state, loading: true});
    const accessToken = Cookies.get('_sp_access_token');
    const { ok, data } = await fetchListens(accessToken);
    if (ok) {
      setState({
        ...state,
        artists: data.artists,
        tracks: data.tracks,
        loading: false
      })
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
    setState({ ...state, renderTab: event.target.innerHTML.toLowerCase() });
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
      {state.loading
        ? <h4>Loading...</h4>
        : <div>
            <ListensContext.Provider value={{ artists: state.artists, tracks: state.tracks }}>
              <div className="tabs-wrapper">
                <span className={"tab active-tab"} onClick={handleTabSwap}>ARTISTS</span>
                <span className={"tab"} onClick={handleTabSwap}>albums</span>
                <span className={"tab"} onClick={handleTabSwap}>tracks</span>
              </div>
              <div>
                {renderTabs(state.renderTab)}
              </div>
            </ListensContext.Provider>
          </div>
      }
    </React.Fragment>
  );
};

export default Listens;
