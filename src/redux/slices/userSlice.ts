import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TUser = {
  name: string;
  phone: string;
  email: string;
};

const initialState: TUser = {
  name: '',
  phone: '',
  email: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.email = action.payload.email;
    },
    clearUser: (state) => {
      state.name = '';
      state.phone = '';
      state.email = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;