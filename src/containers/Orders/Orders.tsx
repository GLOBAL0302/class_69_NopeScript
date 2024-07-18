import { useCallback, useEffect, useState } from 'react';
import { ApiOrders, Order } from '../../types';
import axiosApi from '../../axiosApi';
import Spinner from '../../components/Spinner/Spinner';

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const { data: orders } = await axiosApi.get<ApiOrders | null>(
        '/orders.json',
      );

      if (!orders) {
        setOrders([]);
        return;
      }

      const newOrders: Order[] = Object.keys(orders).map((id) => {
        const order = orders[id];

        const totalPrice = order.dishes.reduce((sum, cartDish) => {
          return sum + cartDish.amount * cartDish.dish.price;
        }, 0);

        return {
          id,
          ...order,
          totalPrice,
        };
      });

      setOrders(newOrders);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="row mt-2">
      <div className="col">
        <h4 className="mb-2">Orders</h4>
        {loading ? (
          <Spinner />
        ) : (
          orders.map((order) => (
            <div key={order.id} className="card mb-2">
              <div className="card-body">
                <strong>{order.customer.name}</strong>
                <span> ordered for a total price of </span>
                <strong>{order.totalPrice} KGS</strong>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
