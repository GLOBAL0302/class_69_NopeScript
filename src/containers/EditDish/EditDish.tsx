import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import axiosApi from '../../axiosApi';
import { ApiDish } from '../../types';
import DishForm from '../../components/DishForm/DishForm';
import { toast } from 'react-toastify';

const EditDish = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [dish, setDish] = useState<ApiDish | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchOneDish = useCallback(async () => {
    const { data: dish } = await axiosApi.get<ApiDish | null>(
      `/dishes/${id}.json`,
    );
    setDish(dish);
  }, [id]);

  const updateDish = async (dish: ApiDish) => {
    try {
      setIsUpdating(true);
      await axiosApi.put(`/dishes/${id}.json`, dish);
      navigate('/');
      toast.success('Dish updated!');
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    void fetchOneDish();
  }, [fetchOneDish]);

  return (
    <div className="row mt-2">
      <div className="col">
        {dish && (
          <DishForm
            onSubmit={updateDish}
            existingDish={dish}
            isLoading={isUpdating}
          />
        )}
      </div>
    </div>
  );
};

export default EditDish;
