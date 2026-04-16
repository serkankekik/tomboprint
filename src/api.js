import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({ baseURL: API_URL });

// Token'ı her istekte header'a ekle
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('tomboprint_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 401 gelince token'ı temizle
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('tomboprint_token');
    }
    return Promise.reject(err);
  }
);

export default api;
