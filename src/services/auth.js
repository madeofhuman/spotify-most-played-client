const loginUrl = process.env.REACT_APP_LOGIN_URL;
const refreshUrl = process.env.REACT_APP_REFRESH_URL;

export const authorizeUser = async (authCode) => {
  try {
    const response = await fetch(loginUrl, {
      method: 'POST',
      body: JSON.stringify({
        auth_code: authCode,
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await fetch(refreshUrl, {
      method: 'POST',
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
