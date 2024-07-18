import React from 'react';
import { Dish } from '../../types';
import { Link } from 'react-router-dom';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  dish: Dish;
  addToCart: VoidFunction; // () => void;
  onDelete: VoidFunction;
  deleteLoading: false | string;
}

const DishItem: React.FC<Props> = ({ dish, addToCart, onDelete, deleteLoading }) => {
  const imageStyle = {
    background: `url(${dish.image}) no-repeat center center / cover`,
  };

  return (
    <div className='card mb-2'>
      <div className='row g-0'>
        <div className='col-sm-4 rounded-start' style={imageStyle} />
        <div className='col-sm-8 ps-2'>
          <h5 className='card-title'>{dish.name}</h5>
          <p className='card-text small'>{dish.description}</p>
          <p className='card-text'>{dish.price} KGS</p>
          <p className='d-flex gap-2'>
            <button
              className='btn btn-success'
              onClick={addToCart}
              disabled={deleteLoading ? deleteLoading === dish.id : false}
            >
              Add
            </button>
            <button
              className='btn btn-danger'
              onClick={onDelete}
              disabled={deleteLoading ? deleteLoading === dish.id : false}
            >
              {deleteLoading && deleteLoading === dish.id && <ButtonSpinner />}
              Delete
            </button>
            <Link className='btn btn-primary' to={`/edit-dish/${dish.id}`}>
              Edit
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DishItem;
