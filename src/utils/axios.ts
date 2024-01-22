import axios from 'axios';

// ----------------------------------------------------------------------

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_HOST_API_kEY,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);
