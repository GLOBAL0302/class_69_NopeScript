import React from 'react';
import DishForm from '../../components/DishForm/DishForm';
import { ApiDish } from '../../types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCreateDishLoading } from '../../store/dishesSlice';
import { createDish } from '../../store/dishesThunks';

const NewDish: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectCreateDishLoading);

  const onSubmit = async (dish: ApiDish) => {
    try {
      await dispatch(createDish(dish)).unwrap();
      console.log('after creating dish');
      navigate('/');
      toast.success('Dish created');
    } catch (error) {
      console.error('here in catch');
    }
  };

  return (
    <div className='row mt-2'>
      <div className='col'>
        <DishForm onSubmit={onSubmit} isLoading={isCreating} />
      </div>
    </div>
  );
};

export default NewDish;
