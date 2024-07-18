import Home from './containers/Home/Home';
import NewDish from './containers/NewDish/NewDish';
import { Route, Routes } from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout';
import Order from './containers/Order/Order';
import EditDish from './containers/EditDish/EditDish';
import Orders from './containers/Orders/Orders';
import Layout from './components/Layout/Layout';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/new-dish' element={<NewDish />} />
        <Route path='/checkout' element={<Checkout />}>
          <Route path='continue' element={<Order />} />
        </Route>
        <Route path='/edit-dish/:id' element={<EditDish />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='*' element={<h1>Not found!</h1>} />
      </Routes>
    </Layout>
  );
};

export default App;
