import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_GATEWAY_URL || 'http://localhost:5000';

const http = axios.create({
  baseURL: `${baseUrl}/api`,
  headers: { 'Content-Type': 'application/json' },
});

export const api = {
  getHeaderItems: () => http.get('/header').then((res) => res.data),
  getFooterItems: () => http.get('/footer').then((res) => res.data),
  getNotificationItems: () => http.get('/notice').then((res) => res.data),
  getPage: (pageName) => http.get(`/page/${encodeURIComponent(pageName)}`).then((res) => res.data),

};
