import axios from "axios";
import toast from 'react-hot-toast';

const {token} = JSON.parse(localStorage.getItem("user")) || {};
const API_URL = import.meta.env.VITE_API_URL; 
const customAxios = axios.create({
    baseURL: API_URL || 'http://localhost:4000/api/',
    // baseURL: `http://localhost:3000/api/`,
    headers: {'authorization': `Bearer ${token}`}
});

customAxios.isCancel = axios.isCancel;

customAxios.interceptors.request.use(config => {
    config.timeout = 10000; // Wait for 5 seconds before timing out
    return config;
});

customAxios.interceptors.response.use(
    response => response,
    error => {
        if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
            var toastLoading = toast.loading('Request timed out');
        }
        error.toast = toastLoading;
        return Promise.reject(error);
    }
);


export default customAxios