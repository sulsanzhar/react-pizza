import { createSlice } from '@reduxjs/toolkit'

export interface CartState {
  cartItems: Number[],
  totalPrice: number
};

const initialState: CartState = {
  cartItems: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  totalPrice: 0
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    onClearCart: (state) => {
      state.cartItems = [];
    },
    onAddCart: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
    }
  },
})

export const { onClearCart, onAddCart } = cartSlice.actions

export default cartSlice.reducer