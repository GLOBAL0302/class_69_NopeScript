import React, { useEffect } from 'react';
import DishItem from './DishItem';
import { AppDispatch } from '../../app/store';
import { addDish } from '../../store/cartSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectDeleteDishesLoading,
  selectDishes,
  selectFetchDishesLoading,
} from '../../store/dishesSlice';
import { deleteDish, fetchDishes } from '../../store/dishesThunks';
import Spinner from '../Spinner/Spinner';

const Dishes: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const deleteLoading = useAppSelector(selectDeleteDishesLoading);
  const fetchLoading = useAppSelector(selectFetchDishesLoading);

  const removeDish = (dishId: string) => {
    dispatch(deleteDish(dishId));
    dispatch(fetchDishes());
  };

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  return (
    <>
      <h4>Dishes</h4>
      {fetchLoading ? (
        <Spinner />
      ) : (
        dishes.map((dish) => (
          <DishItem
            key={dish.id}
            dish={dish}
            addToCart={() => dispatch(addDish(dish))}
            onDelete={() => removeDish(dish.id)}
            deleteLoading={deleteLoading}
          />
        ))
      )}
    </>
  );
};

export default Dishes;
