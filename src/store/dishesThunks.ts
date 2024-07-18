import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import { ApiDishes, Dish } from '../types';
import { AppDispatch } from '../app/store';
import { updateDishes } from './cartSlice';

export const fetchDishes = createAsyncThunk<Dish[], undefined, { dispatch: AppDispatch }>(
  'dishes/fetchDishes',
  async (_, thunkAPI) => {
    const { data: dishesResponse } = await axiosApi.get<ApiDishes | null>('dishes.json');

    let newDishes: Dish[] = [];

    if (dishesResponse) {
      newDishes = Object.keys(dishesResponse).map((id: string) => ({
        ...dishesResponse[id],
        id,
      }));
    }

    thunkAPI.dispatch(updateDishes(newDishes));
    return newDishes;
  }
);

export const deleteDish = createAsyncThunk<void, string>('dishes/deleteDish', async (dishId) => {
  await axiosApi.delete(`dishes/${dishId}.json`);
});
