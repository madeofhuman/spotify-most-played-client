import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { parse } from 'query-string';
import { authorizeUser } from '../services';

const Callback = () => {
  useEffect(() => {
    handleAuthCallback();
  }, []);

  const { push } = useHistory();

  const handleAuthCallback = async () => {
    const authCode = parse(window.location.search).code;
    const { ok, data } = await authorizeUser(authCode);
    if (ok) {
      Cookies.set('_sp_access_token', data.access_token);
      Cookies.set('_sp_refresh_token', data.refresh_token);
      return push('/');
    }
  };

  return (
    <React.Fragment>
      <div>
        <h4>Loading...</h4>
      </div>
    </React.Fragment>
  );
};

export default Callback;
