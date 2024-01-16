// axiosInstance.js
import axios from 'axios';

// Create an Axios instance
const instance = axios.create({
  // baseURL: 'https://api.example.com', // Replace with your API's base URL
  timeout: 60000, // Set a timeout for requests (optional)
});

// Add an interceptor to include the Bearer token in all requests
instance.interceptors.request.use(config => {
  const authToken = process.env.AUTH_BEARER; // Replace with your authentication token
  config.headers.Authorization = `Bearer ${authToken}`;
  return config;
}, error => {
  return Promise.reject(error);
});

export default instance;