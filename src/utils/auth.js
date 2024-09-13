import axios from 'axios';

// Utility function to decode a JWT token and get its expiry time
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(jsonPayload);
}

export function isTokenExpired(token) {
  if (!token) {
    return true;
  }

  const { exp } = parseJwt(token);
  if (!exp) {
    return true;
  }

  // Check if the token is expired
  return Date.now() >= exp * 1000;
}

export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refresh_token');

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/token/refresh/`, {
      refresh: refreshToken,
    });

    const { access } = response.data;

    localStorage.setItem('access_token', access);

    return access;
  } catch (error) {
    console.error('Failed to refresh access token:', error);
    throw error;
  }
}

export async function getAccessToken() {
  let accessToken = localStorage.getItem('access_token');

  if (isTokenExpired(accessToken)) {
    accessToken = await refreshAccessToken();
  }

  return accessToken;
}
