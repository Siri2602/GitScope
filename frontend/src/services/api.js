import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gitscope-backend-w0a2.onrender.com/api',
  timeout: 30000,
});

export const analyzeProfile = (username) =>
  api.post(`/analyze/${username}`).then((r) => r.data);

export const getAllProfiles = () =>
  api.get('/profiles').then((r) => r.data);

export const getProfile = (username) =>
  api.get(`/profile/${username}`).then((r) => r.data);

export const getTopDevelopers = () =>
  api.get('/top-developers').then((r) => r.data);

export const searchByLanguage = (language) =>
  api.get('/search', { params: { language } }).then((r) => r.data);
