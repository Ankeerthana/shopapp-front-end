import React, { useEffect, useState } from 'react';
import { orderAPI } from '../services/api';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    orderAPI.getMyOrders().then(r => setOrders(r.data)).catch(()=>{});
  }, []);

  if (orders.length === 0) return (
    <div className="text-center py-20">
      <p className="text-2xl font-bold mb-2">No orders yet!</p>
      <p className="text-gray-500">Your orders will appear here after purchase.</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Order #{order.id}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium
                ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                  order.status === 'PAID' ? 'bg-blue-100 text-blue-700' :
                  'bg-yellow-100 text-yellow-700'}`}>
                {order.status}
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-2">{order.createdAt}</p>
            <p className="font-bold text-lg">₹{order.totalAmount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}