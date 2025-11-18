import axios from 'axios';
import BackendURL from "./BackendURL"

// Create an axios instance with base URL
const axiosInstance = axios.create({
    baseURL: BackendURL, // Change this to your backend API URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Retrieve token from localStorage
        const token = localStorage.getItem('authToken');

        // If token exists, add it to the request headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Return the modified config to continue the request
        return config;
    },
);

export default axiosInstance;
