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
      
      localStorage.setItem('cart', JSON.stringify({
        items: [],
        totalCount: 0,
        totalPrice: 0,
      }));
    },
    onAddCart: (state, action: PayloadAction<TPizza>) => {
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
        
        const localCart = JSON.parse(localStorage.getItem("cart") || "{}");
        
        if (localCart?.items) {
          const updatedItems = [...localCart.items];
          const pizzaIndex = updatedItems.findIndex(
            (item: TPizza) =>
              item.id === action.payload.id && item.size === action.payload.size
          );
          
          if (pizzaIndex !== -1) {
            const pizza = updatedItems[pizzaIndex];
            if (pizza.count > 1) {
              pizza.count -= 1;
              localCart.totalCount -= 1;
              localCart.totalPrice -= pizza.price;
            } else {
              updatedItems.splice(pizzaIndex, 1);
              localCart.totalCount -= 1;
              localCart.totalPrice -= pizza.price;
            }
            
            localCart.items = updatedItems;
            localStorage.setItem("cart", JSON.stringify(localCart));
          }
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
        
        const localCart = JSON.parse(localStorage.getItem("cart") || "{}");
        
        if (localCart?.items) {
          const updatedItems = localCart.items.filter(
            (item: TPizza) => !(item.id === id && item.size === size)
          );
          
          localCart.items = updatedItems;
          localCart.totalCount -= objFound.count;
          localCart.totalPrice -= objFound.price * objFound.count;
          
          localStorage.setItem("cart", JSON.stringify(localCart));
        }
      }
    },
    onFillCart: (state, action: PayloadAction<ICartState>) => {
        state.cartItems.items = action.payload.items;
        state.cartItems.totalCount = action.payload.totalCount;
        state.totalPrice = action.payload.totalPrice;
    }
  },
})

export const { onClearCart, onAddCart, onMinusCart, onRemoveOne, onFillCart } = cartSlice.actions

export default cartSlice.reducer