import axiosInstance from '../interceptors/axios.ts';
import { getRefreshToken } from '../pages/Auth/utils/tokenService.tsx';
import { AppDispatch } from './store.ts';
import { setUser, clearUser } from './slices/userSlice.ts';

export const getCurrentUser = async () => {
  const refreshToken = getRefreshToken();
  const res = await axiosInstance.post('auth/refresh', {refreshToken}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Accept: "*/*"
    }
  });
  return res.data.user;
};

export const loadUser = () => async (dispatch: AppDispatch) => {
  try {
    const user = await getCurrentUser();
    dispatch(setUser(user));
  } catch (error) {
    console.log(error);
    dispatch(clearUser());
  }
};
