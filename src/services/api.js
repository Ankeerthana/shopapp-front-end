import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080/api' });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authAPI = {
  login:    (data) => API.post('/auth/login', data),
  register: (data) => API.post('/auth/register', data),
};

export const productAPI = {
  getAll:        ()      => API.get('/products'),
  getById:       (id)    => API.get(`/products/${id}`),
  getFeatured:   ()      => API.get('/products/featured'),
  getByCategory: (cat)   => API.get(`/products/category/${cat}`),
  search:        (q)     => API.get(`/products/search?q=${q}`),
  create:        (d)     => API.post('/products', d),
  update:        (id, d) => API.put(`/products/${id}`, d),
  delete:        (id)    => API.delete(`/products/${id}`),
};

export const orderAPI = {
  createPaymentOrder: (amount) => API.post('/payment/create-order', { amount }),
  getMyOrders:        ()       => API.get('/orders/my'),
};

export default API;