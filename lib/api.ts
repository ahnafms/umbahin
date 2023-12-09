// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import axios from 'axios';
import toast from 'react-hot-toast/headless';

import { getStore } from './store';

const baseURL = 'https://laundry-app-backend.vercel.app/api';

let toastId;

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
  timeout: 12000,
  timeoutErrorMessage: 'No Network Connection',
});

api.defaults.withCredentials = false;

api.interceptors.request.use(async (config) => {
  const token = await getStore('token');

  if (token) {
    config.headers.setAuthorization(`Bearer ${token}`);
  }

  if (config.toastify) {
    toastId = toast.loading(config.loadingMessage || 'Loading...', { icon: '👻' });
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    if (response.config.toastify) {
      toast.success(response.config.successMessage || 'Success', { id: toastId, icon: '🤩' });
    }
    return response;
  },
  (error) => {
    if (error.config.toastify) {
      toast.error(error.config.errorMessage || 'Fetching data failed...', {
        id: toastId,
        icon: '🤡',
      });
    }
    return Promise.reject(error);
  }
);

export default api;
