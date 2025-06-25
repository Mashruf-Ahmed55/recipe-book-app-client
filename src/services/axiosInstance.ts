import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
});

export default AxiosInstance;
