import React, { useState } from 'react';
import { ApiOrder, Customer } from '../../types';
import axiosApi from '../../axiosApi';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { useAppSelector } from '../../app/hooks';
import { clearCart, selectCartDishes } from '../../store/cartSlice';
import { AppDispatch } from '../../app/store';
import { useDispatch } from 'react-redux';

const Order: React.FC = () => {
  const cartDishes = useAppSelector(selectCartDishes);
  const dispatch: AppDispatch = useDispatch();
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    address: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const order: ApiOrder = {
      customer,
      dishes: cartDishes,
    };

    try {
      await axiosApi.post('/orders.json', order);
    } finally {
      setIsLoading(false);
      dispatch(clearCart());
      navigate('/');
    }
  };

  let form = (
    <form onSubmit={onFormSubmit}>
      <div className='form-group'>
        <label htmlFor='name'>Client name</label>
        <input
          id='name'
          type='text'
          name='name'
          className='form-control'
          value={customer.name}
          onChange={onFieldChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='address'>Address</label>
        <input
          id='address'
          type='text'
          name='address'
          className='form-control'
          value={customer.address}
          onChange={onFieldChange}
        />
      </div>
      <div className='form-group mb-3'>
        <label htmlFor='phone'>Phone</label>
        <input
          id='phone'
          type='text'
          name='phone'
          className='form-control'
          value={customer.phone}
          onChange={onFieldChange}
        />
      </div>
      <button type='submit' className='btn btn-primary'>
        Place order
      </button>
    </form>
  );

  if (isLoading) {
    form = (
      <div className='d-flex justify-content-center align-items-center' style={{ height: '300px' }}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className='row mt-2'>
      <div className='col'>{form}</div>
    </div>
  );
};

export default Order;
