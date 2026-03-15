import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

export default function Register() {
  const [form, setForm]       = useState({
    email: '', password: '', firstName: '', lastName: ''
  });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      await authAPI.register(form);
      toast.success('Registered successfully! Please login.');
      nav('/login');
    } catch {
      toast.error('Registration failed. Try again.');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Create Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" required
              className="border rounded-lg px-4 py-3 focus:outline-none
              focus:border-blue-500"
              value={form.firstName}
              onChange={e => setForm({...form, firstName: e.target.value})} />
            <input type="text" placeholder="Last Name" required
              className="border rounded-lg px-4 py-3 focus:outline-none
              focus:border-blue-500"
              value={form.lastName}
              onChange={e => setForm({...form, lastName: e.target.value})} />
          </div>
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
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Already have an account?
          <Link to="/login" className="text-blue-600 font-medium"> Login</Link>
        </p>
      </div>
    </div>
  );
}