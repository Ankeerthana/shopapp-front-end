import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Toaster } from 'react-hot-toast';
import Navbar       from './components/Navbar';
import Home         from './pages/Home';
import Products     from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart         from './pages/Cart';
import Checkout     from './pages/Checkout';
import Login        from './pages/Login';
import Register     from './pages/Register';
import Orders       from './pages/Orders';
import StoreLocator from './pages/StoreLocator';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Navbar />
        <Routes>
          <Route path="/"             element={<Home />} />
          <Route path="/products"     element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart"         element={<Cart />} />
          <Route path="/checkout"     element={<Checkout />} />
          <Route path="/login"        element={<Login />} />
          <Route path="/register"     element={<Register />} />
          <Route path="/orders"       element={<Orders />} />
          <Route path="/store-locator" element={<StoreLocator />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}