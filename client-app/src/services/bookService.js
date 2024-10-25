import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7146/api/Books', 
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        alert(error.response.status);
        if (error.response && error.response.status !== 200) {
            alert(`Error: ${error.response.data.message || 'Unknown error'}`);
        }
        return Promise.reject(error);
    }
);

export default api;