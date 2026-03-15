import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    productAPI.getFeatured().then(r => setFeatured(r.data)).catch(()=>{});
    productAPI.getAll().then(r => setNewArrivals(r.data.slice(0, 8))).catch(()=>{});
  }, []);

  return (
    <div className="bg-white">

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800" />
        <div className="absolute inset-0 opacity-20"
          style={{backgroundImage:'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600)',
          backgroundSize:'cover',backgroundPosition:'center'}} />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-blue-400 font-semibold tracking-widest uppercase text-sm mb-4">New Season 2026</p>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-none">
            ELEVATE<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              YOUR STYLE
            </span>
          </h1>
          <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto">
            Discover premium clothing crafted for the modern wardrobe. Free shipping on orders above ₹999.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/products"
              className="bg-white text-slate-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition transform hover:scale-105 shadow-2xl">
              Shop Now →
            </Link>
            <Link to="/products"
              className="border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-slate-900 transition">
              New Arrivals
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white rounded-full" />
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-blue-600 py-3">
        <p className="text-white font-semibold text-center text-sm tracking-wider">
          ✦ FREE SHIPPING ABOVE ₹999 &nbsp;&nbsp; ✦ NEW ARRIVALS EVERY WEEK &nbsp;&nbsp; ✦ EASY 30-DAY RETURNS &nbsp;&nbsp; ✦ COD AVAILABLE
        </p>
      </div>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <p className="text-blue-600 font-semibold tracking-widest uppercase text-sm mb-2">Collections</p>
          <h2 className="text-4xl font-black text-slate-900">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {name:'T-Shirts', img:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600'},
            {name:'Jeans',    img:'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600'},
            {name:'Dresses',  img:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600'},
            {name:'Jackets',  img:'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600'},
          ].map(cat => (
            <Link key={cat.name} to={`/products`}
              className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer">
              <img src={cat.img} alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-black text-2xl">{cat.name}</h3>
                <p className="text-white/80 text-sm">Shop Now →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      {featured.length > 0 && (
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-blue-600 font-semibold tracking-widest uppercase text-sm mb-2">Handpicked</p>
              <h2 className="text-4xl font-black text-slate-900">Featured Products</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featured.slice(0,8).map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="text-center mt-10">
              <Link to="/products"
                className="bg-slate-900 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-600 transition inline-block">
                View All Products →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* PROMO */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-black text-white mb-4">UP TO 50% OFF</h2>
          <p className="text-blue-100 text-xl mb-8">On selected items this season. Limited time offer!</p>
          <Link to="/products"
            className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition inline-block transform hover:scale-105">
            Grab the Deal →
          </Link>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      {newArrivals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-semibold tracking-widest uppercase text-sm mb-2">Just Dropped</p>
            <h2 className="text-4xl font-black text-slate-900">New Arrivals</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* WHY US */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white">Why Shop With Us?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {icon:'🚚', title:'Free Shipping', desc:'On all orders above ₹999'},
              {icon:'↩️', title:'Easy Returns',  desc:'30-day hassle-free returns'},
              {icon:'🔒', title:'Secure Payment',desc:'100% secure transactions'},
              {icon:'💬', title:'24/7 Support',  desc:'Always here to help you'},
            ].map(item => (
              <div key={item.title} className="text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-black text-2xl mb-4">ShopApp</h3>
              <p className="text-gray-400 text-sm">Premium clothing for every occasion. Style meets comfort.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Shop</h4>
              {['T-Shirts','Jeans','Dresses','Jackets'].map(c => (
                <Link key={c} to="/products"
                  className="block text-gray-400 text-sm mb-2 hover:text-white">{c}</Link>
              ))}
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Help</h4>
              {['FAQ','Shipping','Returns','Track Order'].map(c => (
                <p key={c} className="text-gray-400 text-sm mb-2">{c}</p>
              ))}
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <p className="text-gray-400 text-sm mb-2">📧 support@shopapp.com</p>
              <p className="text-gray-400 text-sm mb-2">📞 1800-123-4567</p>
              <p className="text-gray-400 text-sm">📍 Mumbai, India</p>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center">
            <p className="text-gray-500 text-sm">© 2026 ShopApp. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}