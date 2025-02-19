import { configureStore } from '@reduxjs/toolkit';
import filterReducer from "./slices/filterSilce";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
  }
})