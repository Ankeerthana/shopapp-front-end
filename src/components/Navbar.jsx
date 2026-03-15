import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiShoppingCart, FiUser, FiMapPin, FiSearch, FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const cartCount = useSelector(s => s.cart.items.reduce((a,i) => a + i.quantity, 0));
  const token     = localStorage.getItem('token');
  const nav       = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search,   setSearch]   = useState('');

  const logout = () => { localStorage.removeItem('token'); nav('/login'); };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) { nav(`/products`); setSearch(''); }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          <Link to="/" className="text-2xl font-black text-slate-900">
            Shop<span className="text-blue-600">App</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/products" className="text-gray-600 hover:text-blue-600 font-medium transition">Shop</Link>
            {['T-Shirts','Jeans','Dresses','Jackets'].map(cat => (
              <Link key={cat} to="/products"
                className="text-gray-500 hover:text-blue-600 text-sm transition">{cat}</Link>
            ))}
            <Link to="/store-locator" className="text-gray-500 hover:text-blue-600 text-sm flex items-center gap-1">
              <FiMapPin size={14}/> Stores
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-1.5 gap-2">
              <FiSearch size={14} className="text-gray-400" />
              <input type="text" placeholder="Search..."
                className="bg-transparent text-sm outline-none w-24"
                value={search} onChange={e => setSearch(e.target.value)} />
            </form>

            <Link to="/cart" className="relative p-2">
              <FiShoppingCart size={22} className="text-gray-700 hover:text-blue-600 transition" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {token ? (
              <div className="flex items-center gap-2">
                <Link to="/orders" className="p-2">
                  <FiUser size={22} className="text-gray-700 hover:text-blue-600 transition" />
                </Link>
                <button onClick={logout} className="text-sm text-red-500 hover:text-red-700 font-medium">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login"
                className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition">
                Login
              </Link>
            )}

            <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FiX size={22}/> : <FiMenu size={22}/>}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-3">
              <Link to="/products" className="text-gray-700 font-medium py-2" onClick={() => setMenuOpen(false)}>Shop All</Link>
              {['T-Shirts','Jeans','Dresses','Jackets'].map(cat => (
                <Link key={cat} to="/products" className="text-gray-500 py-2" onClick={() => setMenuOpen(false)}>{cat}</Link>
              ))}
              <Link to="/store-locator" className="text-gray-500 py-2" onClick={() => setMenuOpen(false)}>Store Locator</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}