import Axios from 'axios'

const apiClientBackend = Axios.create({
    baseURL: 'http://localhost:3999/api/',
});

apiClientBackend.interceptors.request.use(
    (config) => {
       const data = JSON.parse(localStorage.getItem('administrador'));
       const token = data?.token || "";
       config.headers.Authorization = `Bearer ${token}`;
       config.headers["content-type"] = "application/json";
       return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default apiClientBackend;