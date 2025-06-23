import axios from 'axios';

const hostname = window.location.hostname;
const hasSubdomain = hostname.includes('.') && hostname.split('.').length > 1;
const subdomain = hasSubdomain ? hostname.split('.')[0] : '';
console.log('Subdomain:', subdomain);
const baseURL = subdomain
  ? `http://${subdomain}.localhost:8000` // pas de /api ici
  : 'http://localhost:8000/api'; // dans central app, tu peux avoir /api
console.log('Base URL:', baseURL);
const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default api;
