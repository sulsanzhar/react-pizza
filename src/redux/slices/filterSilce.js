import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface FilterState {
  value: number;
}

const initialState: FilterState = {
  categoryId: 0,
  sortType: {
    name: "популярности",
    property: "rating",
    order: 'asc'
  }
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction) => {
      state.categoryId = action.payload;
    },
    setSortType: (state, action: PayloadAction) => {
      console.log("payload: ", action.payload)
      state.sortType = action.payload;
    }
  },
})

export const { setCategoryId, setSortType, sortType } = filterSlice.actions

export default filterSlice.reducer