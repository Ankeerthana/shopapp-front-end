import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import toast from 'react-hot-toast';

export default function ProductCard({ product: p }) {
  const dispatch = useDispatch();

  const addCart = () => {
    dispatch(addToCart({ ...p, size: 'M' }));
    toast.success(`${p.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden group shadow hover:shadow-xl transition duration-300 border border-gray-100">
      <Link to={`/products/${p.id}`} className="block relative overflow-hidden">
        <div className="h-56 bg-gray-100 overflow-hidden">
          {p.imageUrl
            ? <img src={p.imageUrl} alt={p.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
            : <div className="w-full h-full flex items-center justify-center text-6xl">👕</div>
          }
        </div>
        {p.featured && (
          <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            ★ Featured
          </span>
        )}
      </Link>
      <div className="p-4">
        <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-1">
          {p.brand} · {p.category}
        </p>
        <Link to={`/products/${p.id}`}>
          <h3 className="font-bold text-slate-800 hover:text-blue-600 transition mb-2 line-clamp-1">{p.name}</h3>
        </Link>
        <p className="text-xs text-gray-400 mb-3 line-clamp-1">{p.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-black text-xl text-slate-900">₹{p.price}</span>
          <button onClick={addCart}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition transform hover:scale-105 active:scale-95">
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}
