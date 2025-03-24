import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TPizza = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  category: string,
  rating: number,
  size: number;
  count: number;
}

export interface ICartState {
  cartItems: {
    items: TPizza[],
    totalCount: number;
  },
  totalPrice: number;
};

const initialState: ICartState = {
  cartItems: {
    items: [],
    totalCount: 0,
  },
  totalPrice: 0
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    onClearCart: (state) => {
      state.cartItems = {
        items: [],
        totalCount: 0,
      };
      state.totalPrice = 0;
    },
    onAddCart: (state, action: PayloadAction<any>) => {
      const existingPizza = state.cartItems.items.find(
        (item) => item.id === action.payload.id && item.size === action.payload.size
      );

      if (existingPizza) existingPizza.count++;
      else state.cartItems.items.push({ ...action.payload, count: 1 });

      state.totalPrice = state.cartItems.items.reduce((acc, item) => acc + (item.price * item.count), 0);
      state.cartItems.totalCount++;
    },
    onMinusCart: (state, action: PayloadAction<{ id: string; size: number }>) => {
      const findPizza = state.cartItems.items.find(
        (item) => item.id === action.payload.id && item.size === action.payload.size
      );
      if (findPizza) {
        if (findPizza.count > 1) {
          findPizza.count -= 1;
          state.cartItems.totalCount -= 1;
          state.totalPrice -= findPizza.price;
        } else {
          state.cartItems.items = state.cartItems.items.filter(
            (item) => !(item.id === action.payload.id && item.size === action.payload.size)
          );
          state.cartItems.totalCount -= 1;
          state.totalPrice -= findPizza.price;
        }
      }
    },
    onRemoveOne: (state, action: PayloadAction<{ id: string; size: number }>) => {
      const { id, size } = action.payload;
      const objFound = state.cartItems.items.find(item => item.id === id && item.size === size);

      if (objFound) {
        state.cartItems.items = state.cartItems.items.filter(
          (item) => !(item.id === id && item.size === size)
        );
        state.cartItems.totalCount -= objFound.count;
        state.totalPrice -= objFound.price * objFound.count;
      }
    },
  },
})

export const { onClearCart, onAddCart, onMinusCart, onRemoveOne } = cartSlice.actions

export default cartSlice.reducer