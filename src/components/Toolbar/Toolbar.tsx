import React from 'react';
import { NavLink } from 'react-router-dom';

const Toolbar: React.FC = () => {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          Plovo
        </NavLink>
        <ul className="navbar-nav d-flex flex-row gap-3 flex-nowrap">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/new-dish" className="nav-link">
              New Dish
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/orders" className="nav-link">
              Orders
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Toolbar;
