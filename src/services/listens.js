const listensUrl = process.env.REACT_APP_LISTENS_URL;

export const fetchListens = async (accessToken) => {
  try {
    const response = await fetch(listensUrl, {
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
