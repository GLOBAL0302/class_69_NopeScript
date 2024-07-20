import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import { ApiDish, ApiDishes, Dish } from '../types';
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

export const createDish = createAsyncThunk<void, ApiDish>('dishes/create', async (apiDish) => {
  await axiosApi.post('/dishes.json', apiDish);
});

export const fetchOneDish = createAsyncThunk<ApiDish, string>('dishes/fetchOne', async (id) => {
  const { data: dish } = await axiosApi.get<ApiDish | null>(`/dishes/${id}.json`);

  if (dish === null) {
    throw new Error('not found');
  }
  return dish;
});

export interface updateDishArg {
  id: string;
  apiDish: ApiDish;
}

export const updateDish = createAsyncThunk<void, updateDishArg>(
  'dishes/update',
  async ({ id, apiDish }) => {
    await axiosApi.put(`dishes/${id}.json`, apiDish);
  }
);
