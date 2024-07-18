import React, { useState } from 'react';
import DishForm from '../../components/DishForm/DishForm';
import { ApiDish } from '../../types';
import axiosApi from '../../axiosApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const NewDish: React.FC = () => {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);

  const createDish = async (dish: ApiDish) => {
    try {
      setIsCreating(true);
      await axiosApi.post('/dishes.json', dish);
      navigate('/');
      toast.success('Dish created');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="row mt-2">
      <div className="col">
        <DishForm onSubmit={createDish} isLoading={isCreating} />
      </div>
    </div>
  );
};

export default NewDish;
