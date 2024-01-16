// axiosInstance.js
import axios from 'axios';

// Create an Axios instance
const instance = axios.create({
  // baseURL: 'https://api.example.com', // Replace with your API's base URL
  timeout: 60000, // Set a timeout for requests (optional)
});

// Add an interceptor to include the Bearer token in all requests
instance.interceptors.request.use(config => {
  // const authToken = process.env.AUTH_BEARER;
  const authToken = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJUZWNoUG9ydCIsImV4cCI6MTcwNTQxNjkyNywibmJmIjoxNzA1MzMwNTI3LCJTRVNTSU9OX0lEIjoiWm5xa0JjUGs2bzExMGRtWWZESDkwZVI4bWhtRUpRY1I1Q1VEIiwiRklOR0VSUFJJTlRfSEFTSCI6IjM0REQ1MDZBNjhDREZBQTZFQjgzNEY4NTcyNkExMzJBNzU2RTU1RDEzNkI4NUNENTJDNTkyMjg1RjhDMTI5MTkifQ.8w44Gk8_PfrNgSeRGd25tPfpl2UovcKj2gT9S6FP97k';
  config.headers.Authorization = `Bearer ${authToken}`;
  return config;
}, error => {
  return Promise.reject(error);
});

export default instance;