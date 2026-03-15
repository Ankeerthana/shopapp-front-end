import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../store/cartSlice';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { items, total } = useSelector(s => s.cart);
  const dispatch         = useDispatch();

  if (items.length === 0) return (
    <div className="text-center py-20">
      <p className="text-2xl font-bold mb-4">Your cart is empty</p>
      <Link to="/products"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
        Shop Now
      </Link>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="space-y-4 mb-8">
        {items.map((item, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-4
            flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">
                Size: {item.size} | Qty: {item.quantity}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-bold">₹{item.price * item.quantity}</span>
              <button onClick={() => dispatch(removeFromCart(i))}
                className="text-red-500 hover:text-red-700 text-sm">Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between text-xl font-bold mb-4">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
        <Link to="/checkout"
          className="block w-full bg-blue-600 text-white py-3 rounded-xl
          text-center font-semibold text-lg hover:bg-blue-700 transition">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}