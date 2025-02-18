import { configureStore } from '@reduxjs/toolkit';
import { filterSlice } from "./slices/filterSilce";

export const store = configureStore({
  reducer: {
    filter: filterSlice
  }
})