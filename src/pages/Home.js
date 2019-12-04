import React, { useEffect, useState, useContext } from 'react';
import Cookies from 'js-cookie';
import { refreshAccessToken, fetchUser } from '../services';
import ProfileContext from '../providers/ProfileContext';
import Listens from '../components/Listens';

const oauthUrl = `${process.env.REACT_APP_SPOTIFY_OAUTH_URL}?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=${process.env.REACT_APP_SCOPE}`;

const Home = () => {
  useEffect(() => {
    handleAuthHome();
  }, []);

  const [ state, setState ] = useState({
    loading: false,
    username: ''
  });

  const getRefreshedAccessToken = async (setState, state) => {
    const refreshToken = Cookies.get('_sp_refresh_token');
    if (refreshToken && refreshToken.length) {
      const { ok, data } = await refreshAccessToken(refreshToken);
      if (ok) {
        Cookies.set('_sp_access_token', data.access_token);
        setState({ ...state, loading: false });
        window.location.reload();
      }
      else {
        window.location.assign(oauthUrl);
      }
    }
    else {
      window.location.assign(oauthUrl);
    }
  }

  const handleAuthHome = async () => {
    const accessToken = Cookies.get('_sp_access_token');
    if (!accessToken || !accessToken.length) {
      setState({ ...state, loading: true });
      await getRefreshedAccessToken(setState, state);
    }
    const { ok, data: userData } = await fetchUser(accessToken);
    if (ok) {
      setState({ ...state, username: userData.display_name.split(' ')[0] });
    } else {
      await getRefreshedAccessToken(setState, state);
    }
  };

  return (
    <React.Fragment>
      {state.loading
        ? <h4>Loading...</h4>
        : <div>
            <ProfileContext.Provider value={state.username}>
              <Listens />
            </ProfileContext.Provider>
          </div>
      }
    </React.Fragment>
  );
};

export default Home;
