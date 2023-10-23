import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:4000/',
    headers: {
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
    }
})

axiosClient.interceptors.request.use(
    (config) => {
        // Get the token from wherever it's stored (e.g., a cookie or local storage)
        const token = getTokenFromWherever();

        // If a token is available, set it in the Authorization header
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

function getTokenFromWherever() {
    return localStorage.getItem("token")
}

export default axiosClient;