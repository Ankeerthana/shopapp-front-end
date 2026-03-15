import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/cartSlice';
import { orderAPI } from '../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { items, total } = useSelector(s => s.cart);
  const dispatch = useDispatch();
  const nav      = useNavigate();
  const [address, setAddress] = useState('');

  const handlePay = async () => {
    if (!address) { toast.error('Enter delivery address'); return; }
    try {
      const { data } = await orderAPI.createPaymentOrder(total);
      const options = {
        key:         data.keyId,
        amount:      data.amount,
        currency:    'INR',
        name:        'ShopApp',
        description: 'Clothing Purchase',
        order_id:    data.orderId,
        handler: async () => {
          toast.success('Payment successful! Order placed.');
          dispatch(clearCart());
          nav('/orders');
        },
        theme: { color: '#2563eb' }
      };
      new window.Razorpay(options).open();
    } catch { toast.error('Payment failed. Try again.'); }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
        {items.map((item, i) => (
          <div key={i} className="flex justify-between py-2 border-b">
            <span>{item.name} x{item.quantity} ({item.size})</span>
            <span className="font-medium">₹{item.price * item.quantity}</span>
          </div>
        ))}
        <div className="flex justify-between mt-4 text-xl font-bold">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>
      <textarea placeholder="Enter full delivery address..." rows={3}
        className="w-full border rounded-lg px-4 py-3 mb-6
        focus:outline-none focus:border-blue-500"
        value={address} onChange={e => setAddress(e.target.value)} />
      <button onClick={handlePay}
        className="w-full bg-blue-600 text-white py-4 rounded-xl
        text-lg font-semibold hover:bg-blue-700 transition">
        Pay ₹{total.toFixed(2)} with Razorpay
      </button>
    </div>
  );
}
