import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [products, setProducts]   = useState([]);
  const [filtered, setFiltered]   = useState([]);
  const [search, setSearch]       = useState('');
  const [category, setCategory]   = useState('');
  const [sortBy, setSortBy]       = useState('default');
  const [loading, setLoading]     = useState(true);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat    = params.get('category') || '';
    const q      = params.get('search')   || '';
    setCategory(cat);
    setSearch(q);
  }, [location]);

  useEffect(() => {
    setLoading(true);
    productAPI.getAll()
      .then(r => { setProducts(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = [...products];
    if (search)   result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (category) result = result.filter(p => p.category === category);
    if (sortBy === 'low')  result.sort((a,b) => a.price - b.price);
    if (sortBy === 'high') result.sort((a,b) => b.price - a.price);
    if (sortBy === 'name') result.sort((a,b) => a.name.localeCompare(b.name));
    setFiltered(result);
  }, [products, search, category, sortBy]);

  const categories = ['','T-Shirts','Jeans','Dresses','Jackets'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-slate-900 py-12 px-4 text-center">
        <h1 className="text-4xl font-black text-white mb-2">
          {category || 'All Products'}
        </h1>
        <p className="text-gray-400">{filtered.length} items found</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 bg-white p-4 rounded-2xl shadow-sm">
          <input type="text" placeholder="🔍 Search products..."
            className="border border-gray-200 rounded-xl px-4 py-2 flex-1
            min-w-48 focus:outline-none focus:border-blue-500"
            value={search}
            onChange={e => setSearch(e.target.value)} />
          <select
            className="border border-gray-200 rounded-xl px-4 py-2
            focus:outline-none focus:border-blue-500"
            value={category}
            onChange={e => setCategory(e.target.value)}>
            {categories.map(c => (
              <option key={c} value={c}>{c || 'All Categories'}</option>
            ))}
          </select>
          <select
            className="border border-gray-200 rounded-xl px-4 py-2
            focus:outline-none focus:border-blue-500"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}>
            <option value="default">Sort By</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition
              ${category === c
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'}`}>
              {c || 'All'}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">⏳</div>
            <p className="text-gray-500">Loading products...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">😕</div>
            <p className="text-gray-500 text-xl">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}