import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_GATEWAY_URL || 'http://localhost:4000';

const http = axios.create({
  baseURL: `${baseUrl}/api`,
  headers: { 'Content-Type': 'application/json' },
});

export const api = {
  getHeaderItems: () => http.get('/header').then((res) => res.data),
};
