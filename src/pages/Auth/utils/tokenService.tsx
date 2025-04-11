// import Cookies from 'js-cookie';

export const saveTokens = (accessToken: string, refreshToken: string) => {
  // Cookies.set('accessToken', accessToken);
  // Cookies.set('refreshToken', refreshToken);
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

// export const getAccessToken = () => Cookies.get('accessToken');
// export const getRefreshToken = () => Cookies.get('refreshToken');
export const getAccessToken = () => localStorage.getItem('accessToken');
export const getRefreshToken = () => localStorage.getItem('refreshToken');

export const removeTokens = () => {
  // Cookies.remove('accessToken');
  // Cookies.remove('refreshToken');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};