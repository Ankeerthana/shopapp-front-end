import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productAPI } from '../services/api';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [size, setSize]       = useState('M');
  const dispatch              = useDispatch();

  useEffect(() => {
    productAPI.getById(id).then(r => setProduct(r.data)).catch(()=>{});
  }, [id]);

  if (!product) return <div className="text-center py-20">Loading...</div>;

  const sizes = product.sizes ? product.sizes.split(',') : ['S','M','L','XL'];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-gray-100 rounded-2xl h-96 flex items-center justify-center">
          {product.imageUrl
            ? <img src={product.imageUrl} alt={product.name}
                className="w-full h-full object-cover rounded-2xl" />
            : <span className="text-8xl">👕</span>
          }
        </div>
        <div>
          <p className="text-blue-600 font-medium mb-2">{product.category}</p>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <p className="text-3xl font-bold text-blue-600 mb-6">₹{product.price}</p>
          <div className="mb-6">
            <p className="font-semibold mb-2">Select Size:</p>
            <div className="flex gap-2">
              {sizes.map(s => (
                <button key={s} onClick={() => setSize(s)}
                  className={`px-4 py-2 rounded-lg border font-medium
                  ${size === s
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'hover:border-blue-600'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => {
              dispatch(addToCart({ ...product, size }));
              toast.success(`${product.name} added to cart!`);
            }}
            className="w-full bg-blue-600 text-white py-3 rounded-xl
            font-semibold text-lg hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}