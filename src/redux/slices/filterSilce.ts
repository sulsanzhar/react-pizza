import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TSort = {
  name: string;
  property: string;
  order: string
}

type TFilter = {
  name: string;
  property: string;
  order: string;
  category: number;
}

export interface IFilterState {
  categoryId: number;
  sortType: TSort;
  searchValue: string;
}

const initialState: IFilterState = {
  categoryId: 0,
  sortType: {
    name: "популярности",
    property: "rating",
    order: 'asc'
  },
  searchValue: ""
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = Number(action.payload);
    },
    setSortType: (state, action: PayloadAction<TSort>) => {
      state.sortType = {
        name: action.payload.name,
        property: action.payload.property,
        order: action.payload.order
      };
    },
    setFilters: (state, action: PayloadAction<TFilter>) => {
      state.categoryId = action.payload.category;

      state.sortType = {
        ...state.sortType,
        name: action.payload.name ? action.payload.name : "популярности",
        property: action.payload.property ? action.payload.property : "rating",
        order: action.payload.order ? action.payload.order : "asc",
      };
    },
    setSearchValue: (state, action: PayloadAction) => {
      state.searchValue = String(action.payload);
    }
  },
})

export const { setCategoryId, setSortType, setFilters, setSearchValue} = filterSlice.actions

export default filterSlice.reducer