import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

export default function Login() {
  const [form, setForm]       = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      const { data } = await authAPI.login(form);
      localStorage.setItem('token', data.token);
      toast.success('Welcome back!');
      nav('/');
    } catch {
      toast.error('Invalid email or password');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Welcome Back</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" required
            className="w-full border rounded-lg px-4 py-3 focus:outline-none
            focus:border-blue-500"
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})} />
          <input type="password" placeholder="Password" required
            className="w-full border rounded-lg px-4 py-3 focus:outline-none
            focus:border-blue-500"
            value={form.password}
            onChange={e => setForm({...form, password: e.target.value})} />
          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold
            hover:bg-blue-700 disabled:opacity-50">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          No account?
          <Link to="/register" className="text-blue-600 font-medium"> Register</Link>
        </p>
      </div>
    </div>
  );
}
