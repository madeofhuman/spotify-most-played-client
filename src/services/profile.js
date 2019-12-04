const profileUrl = process.env.REACT_APP_PROFILE_URL;

export const fetchUser = async (accessToken) => {
  try {
    const response = await fetch(profileUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });
    const data = await response.json();
    return data
  } catch (error) {
    return error;
  }
};
