import React, { useState } from 'react';
import { ApiDish, DishMutation } from '../../types';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  onSubmit: (dish: ApiDish) => void;
  existingDish?: ApiDish;
  isLoading?: boolean;
}

const emptyState: DishMutation = {
  name: '',
  description: '',
  image: '',
  price: '',
};

const DishForm: React.FC<Props> = ({
  onSubmit,
  existingDish,
  isLoading = false,
}) => {
  const initialState: DishMutation = existingDish
    ? { ...existingDish, price: existingDish.price.toString() }
    : emptyState;

  const [dishMutation, setDishMutation] = useState<DishMutation>(initialState);

  const changeDish = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setDishMutation((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit({
      ...dishMutation,
      price: parseFloat(dishMutation.price),
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <h4>{existingDish ? 'Edit dish' : 'Add new dish'}</h4>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="form-control"
          onChange={changeDish}
          value={dishMutation.name}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          className="form-control"
          onChange={changeDish}
          value={dishMutation.description}
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">Image</label>
        <input
          type="url"
          name="image"
          id="image"
          required
          className="form-control"
          onChange={changeDish}
          value={dishMutation.image}
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          id="price"
          required
          min="1"
          className="form-control"
          onChange={changeDish}
          value={dishMutation.price}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary mt-2"
        disabled={isLoading}
      >
        {isLoading && <ButtonSpinner />}
        {existingDish ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default DishForm;
