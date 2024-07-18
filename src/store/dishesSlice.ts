import { Dish } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { deleteDish, fetchDishes } from './dishesThunks';
import { RootState } from '../app/store';

interface IDishesState {
  items: Dish[];
  fetchLoading: boolean;
  deleteLoading: false | string;
}

const initialState: IDishesState = {
  items: [],
  fetchLoading: false,
  deleteLoading: false,
};

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchDishes.fulfilled, (state, { payload: items }) => {
        state.fetchLoading = false;
        state.items = items;
      })
      .addCase(fetchDishes.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(deleteDish.pending, (state, { meta: { arg: dishId } }) => {
        state.deleteLoading = dishId;
      })
      .addCase(deleteDish.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteDish.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
});

export const dishesReducer = dishesSlice.reducer;
export const selectDishes = (state: RootState) => state.dishes.items;
export const selectFetchDishesLoading = (state: RootState) => state.dishes.fetchLoading;
export const selectDeleteDishesLoading = (state: RootState) => state.dishes.deleteLoading;
