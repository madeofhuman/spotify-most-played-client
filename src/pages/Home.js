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

  const getRefreshedAccessToken = async () => {
    const refreshToken = Cookies.get('_sp_refresh_token');
    if (refreshToken && refreshToken.length) { // if there's a refresh token in the cookies
      const { ok, data } = await refreshAccessToken(refreshToken); // use the refresh token to fetch a new access token
      if (ok) { // if successful fetch
        Cookies.set('_sp_access_token', data.access_token);
        setState({ ...state, loading: false });
      } else { // fetching of access token with refresh token failed
        window.location.assign(oauthUrl); // start a new oauth flow
      }
    } else { // there's no refresh token in the cookies
      window.location.assign(oauthUrl); // start a new oauth flow
    }
  }

  const handleAuthHome = async () => {
    const accessToken = Cookies.get('_sp_access_token');
    if (!accessToken || !accessToken.length) { // if there's no access token in cookie or it has empty value
      setState({ ...state, loading: true });
      await getRefreshedAccessToken(); // fetch a new access token using the refresh token
    } else { // if there's an access token in the cookie
      setState({ ...state, loading: true });
      const { ok, data } = await fetchUser(accessToken); // fetch the user's profile data (also doubles as validating the access token)
      if (ok) { // if successful fetch (aka access token is valid)
        setState({
          username: data.display_name.split(' ')[0],
          loading: false
        });
      } else { // fetching of user profile failed (most likely token is invalid)
        setState({ ...state, loading: true });
        await getRefreshedAccessToken(); // fetch a new access token using the refresh token
        const accessToken = Cookies.get('_sp_access_token');
        setState({ ...state, loading: true });
        const { ok, data } = await fetchUser(accessToken); // using the new access token, fetch the user's profile
        if (ok) { // if successful fetch (aka access token is valid)
          setState({
            username: data.display_name.split(' ')[0],
            loading: false
          });
        } else { // fetching of user profile failed (most likely token is invalid)
          window.location.assign(oauthUrl); // start a new oauth flow
        }
      }
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
