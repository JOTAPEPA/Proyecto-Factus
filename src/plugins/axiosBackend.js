import Axios from 'axios'

const apiClientBackend = Axios.create({
    baseURL: 'http://localhost:3999/api/',
    headers: {
        'content-type': 'application/json',
    }
});

apiClientBackend.interceptors.request.use(
    (config) => {
        const store = JSON.parse(localStorage.getItem("administrador"));
        const token = store.token;
        console.log("token interceptado", token);
        if(token){
            config.headers['Authorization'] = `Bearer ${token}`;
        } else{
            console.log('Token no encontrado');

        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default apiClientBackend;