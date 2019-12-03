import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { refreshAccessToken } from '../services';
import Listens from '../components/Listens';

const oauthUrl = `${process.env.REACT_APP_SPOTIFY_OAUTH_URL}?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=${process.env.REACT_APP_SCOPE}`;

const Home = () => {
  useEffect(() => {
    handleAuthHome();
  }, []);

  const [ loading, setLoading ] = useState(false);

  const handleAuthHome = async () => {
    const accessToken = Cookies.get('_sp_access_token');
    if (!accessToken || !accessToken.length) {
      setLoading(true);
      const refreshToken = Cookies.get('_sp_refresh_token');
      if (refreshToken && refreshToken.length > 0) {
        const { ok, data } = await refreshAccessToken(refreshToken);
        if (ok) {
          Cookies.set('_sp_access_token', data.access_token)
          setLoading(false);
        } else {
          window.location.assign(oauthUrl);
        }
      } else {
        window.location.assign(oauthUrl);
      }
    }
  };

  return (
    <React.Fragment>
      {loading
        ? <h4>Loading...</h4>
        : <div>
            <Listens />
          </div>
      }
    </React.Fragment>
  );
};

export default Home;
