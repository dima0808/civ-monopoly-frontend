import axios from 'axios';
import Cookies from 'js-cookie';
import { HTTP_BASE_URL } from '../../constants/api.js';

const instance = axios.create({
  baseURL: HTTP_BASE_URL,
});

instance.interceptors.request.use((request) => {
  request.headers['Authorization'] = `Bearer ${Cookies.get('token')}`;
  return request;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = 'Unexpected error';

    if (error.response?.data?.detail) {
      message = error.response.data.detail;
    } else if (error.message) {
      message = error.message;
    }

    return Promise.reject(new Error(message));
  },
);

export default instance;
